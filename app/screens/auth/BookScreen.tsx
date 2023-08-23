import { ReactElement, useCallback, useMemo, useRef } from 'react';
import Scaffold from '../../components/commons/Scaffold';
import useGetColorPaletteFromImage from '../../hooks/useGetColorPaletteFromImage';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    View,
    ViewStyle,
    TouchableOpacity
} from 'react-native';
import * as React from 'react';
import {
    ArrowLeftIcon,
    EllipsisVerticalIcon,
    FolderIcon,
    GlobeAltIcon,
    HeartIcon as HeartIconOutline,
    PlusIcon,
    StarIcon,
    TrashIcon
} from 'react-native-heroicons/outline';
import { HeartIcon as HeartIconSolid } from 'react-native-heroicons/solid';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { Book, BookData, VolumeInfo } from '../../types/entities';
import Header from '../../components/commons/Header';
import { useNavigation } from '@react-navigation/native';
import useAppDispatch from '../../hooks/useAppDispath';
import { addBook, updateBook } from '../../store/slices/bookshelfSlice';
import { isBook, isBookData } from '../../utils/typeCheck';
import Menu from '../../components/portals/Menu';
import MenuItem from '../../components/commons/MenuItem';
import { PortalHost } from '@gorhom/portal';
import ReadButton from '../../components/commons/ReadButton';
import MultiSelectModal from '../../components/modals/MultiSelectModal';
import useAppSelector from '../../hooks/useAppSelector';
import useTheme from '../../hooks/useTheme';
import BaseText from '../../components/commons/BaseText';
import CustomModal, { CustomModalMethods } from '../../components/custom/CustomModal';
import Chip from '../../components/commons/Chip';

type BookScreenProps = NativeStackScreenProps<RootStackParamList, 'Book'>;
function BookScreen({
    route: {
        params: { book }
    }
}: BookScreenProps) {
    // Hooks
    const theme = useTheme();
    const navigation = useNavigation<any>();
    const dispatch = useAppDispatch();
    const { color, isLoading } = useGetColorPaletteFromImage(
        isBook(book)
            ? book.volumeInfo.imageLinks?.thumbnail ??
                  require('../../assets/images/book-placeholder.webp')
            : book.book.volumeInfo.imageLinks?.thumbnail ??
                  require('../../assets/images/book-placeholder.webp')
    );

    // Global States
    const folders = useAppSelector(store =>
        store.bookshelf.folders.length ? store.bookshelf.folders : ['Default']
    );
    const bookState =
        useAppSelector(store => store.bookshelf.bookshelf).find(
            b => b.book.id === (isBook(book) ? book.id : book.book.id)
        ) ?? book;

    // References
    const multiSelectorRef = useRef<CustomModalMethods>(null);

    // Memos
    const volumeInfo = useMemo<VolumeInfo>(
        () => (book as Book).volumeInfo ?? (book as BookData).book.volumeInfo,
        [bookState]
    );

    const headerContainerStyle = useMemo<ViewStyle>(
        () => ({ ...styles.headerContainer, backgroundColor: color?.average ?? 'grey' }),
        [color]
    );

    const titleColor = useMemo<string>(() => color?.onAverage ?? theme.palette.primary, [color]);

    const textContainerColor = useMemo<string>(
        () => color?.onLightVibrant ?? theme.palette.primary,
        [color]
    );

    const footerStyle = useMemo<ViewStyle>(
        () => ({
            ...styles.footer,
            backgroundColor: color?.average
        }),
        [color]
    );

    const handleIsSelected = useMemo(() => {
        if (isBookData(bookState)) {
            return (item: string) => bookState.folders.includes(item);
        } else return undefined;
    }, [bookState]);

    const RatingText = useMemo<ReactElement<typeof BaseText>>(
        () => (
            <BaseText variant={'body'} size={'large'} color={textContainerColor}>
                {volumeInfo?.averageRating || 0}
            </BaseText>
        ),
        [volumeInfo, textContainerColor]
    );

    const LanguageText = useMemo<ReactElement<typeof BaseText>>(
        () => (
            <BaseText
                variant={'body'}
                size={'large'}
                color={textContainerColor}
                textTransform={'uppercase'}>
                {volumeInfo?.language}
            </BaseText>
        ),
        [volumeInfo, textContainerColor]
    );

    const RatingIcon = useMemo<ReactElement<typeof StarIcon>>(
        () => <StarIcon color={color?.onLightVibrant} />,
        [color]
    );

    const LanguageIcon = useMemo<ReactElement<typeof GlobeAltIcon>>(
        () => <GlobeAltIcon color={color?.onLightVibrant} />,
        [color]
    );

    // Callbacks
    const handleOnBack = useCallback(() => {
        navigation.goBack();
    }, []);

    const handleOnMove = useCallback(
        (items: string[]) => {
            dispatch(addBook({ book: isBook(book) ? book : book.book, folders: items }));
        },
        [book]
    );

    const handleOnAdd = useCallback(() => {
        if (folders.length === 1) {
            dispatch(addBook({ book: isBook(book) ? book : book.book, folders: [folders[0]] }));
        } else {
            multiSelectorRef.current?.present();
        }
    }, [folders, multiSelectorRef.current]);

    const handleAddToFavorite = useCallback(() => {
        if (isBookData(bookState))
            dispatch(updateBook({ ...bookState, favorite: !bookState.favorite }));
    }, [bookState]);

    const handleRemoveFromLibrary = useCallback(() => {
        if (isBookData(bookState)) dispatch(updateBook({ ...bookState, folders: [] }));
    }, []);

    const handleOnOpen = useCallback(() => {
        multiSelectorRef.current?.present();
    }, [multiSelectorRef.current]);

    const handleOnClose = useCallback(() => {
        multiSelectorRef.current?.close();
    }, [multiSelectorRef.current]);

    // Renders
    if (isLoading)
        return (
            <Scaffold style={styles.emptyScaffold}>
                <ActivityIndicator />
            </Scaffold>
        );
    return (
        <>
            <PortalHost name='menu' />
            <PortalHost name='alert' />
            <CustomModal ref={multiSelectorRef} title={'book:select'}>
                <MultiSelectModal<string>
                    items={folders}
                    isSelected={handleIsSelected}
                    getItemsLabel={item => item}
                    onDone={items => handleOnMove(items)}
                    onEdit={() => navigation.push('Folders')}
                    onClose={handleOnClose}
                />
            </CustomModal>
            <ScrollView>
                <View style={headerContainerStyle}>
                    <View style={{ ...styles.row, ...styles.header }}>
                        <TouchableOpacity onPress={handleOnBack} style={styles.headerActions}>
                            <View style={styles.row}>
                                <ArrowLeftIcon color={color?.onAverage} />
                                <BaseText
                                    variant={'title'}
                                    size={'medium'}
                                    color={titleColor}
                                    textTransform={'uppercase'}>
                                    general:back
                                </BaseText>
                            </View>
                        </TouchableOpacity>
                        {isBookData(bookState) && (
                            <Menu
                                icon={<EllipsisVerticalIcon color={color?.onAverage} />}
                                title={'book:options'}>
                                <MenuItem
                                    text={'book:fav'}
                                    icon={bookState.favorite ? HeartIconSolid : HeartIconOutline}
                                    color={theme.palette.onBackground}
                                    onPress={handleAddToFavorite}
                                />
                                <MenuItem
                                    text={'book:move'}
                                    icon={FolderIcon}
                                    color={theme.palette.onBackground}
                                    onPress={handleOnOpen}
                                />
                                <MenuItem
                                    text={'book:remove'}
                                    icon={TrashIcon}
                                    color={theme.palette.onBackground}
                                    onPress={handleRemoveFromLibrary}
                                />
                            </Menu>
                        )}
                    </View>
                </View>
                <Scaffold style={styles.scaffold}>
                    <View style={styles.body}>
                        <View style={{ ...styles.row, ...styles.imageSection }}>
                            <View style={styles.imageContainer}>
                                <Image
                                    style={styles.image}
                                    defaultSource={require('../../assets/images/book-placeholder.webp')}
                                    source={
                                        volumeInfo?.imageLinks?.thumbnail
                                            ? { uri: volumeInfo?.imageLinks?.thumbnail }
                                            : require('../../assets/images/book-placeholder.webp')
                                    }
                                />
                            </View>
                            {isBookData(bookState) && (
                                <View style={styles.column}>
                                    <ReadButton
                                        book={bookState}
                                        color={color?.lightVibrant}
                                        iconColor={color?.onLightVibrant}
                                    />
                                    <View style={styles.row}>
                                        <BaseText
                                            variant={'headline'}
                                            size={'small'}
                                            color={theme.palette.onBackground}>
                                            {bookState.currentPage}{' '}
                                            <BaseText
                                                variant={'body'}
                                                size={'large'}
                                                color={theme.palette.onBackground}>
                                                /{volumeInfo?.pageCount}
                                            </BaseText>
                                        </BaseText>
                                    </View>
                                </View>
                            )}
                        </View>
                        <BaseText
                            variant={'title'}
                            size={'large'}
                            color={theme.palette.onBackground}>
                            {volumeInfo?.authors?.join(', ')}
                        </BaseText>
                        <BaseText
                            variant={'headline'}
                            size={'medium'}
                            color={theme.palette.onBackground}>
                            {volumeInfo?.title}
                        </BaseText>
                        <View style={styles.tags}>
                            {volumeInfo?.averageRating && (
                                <Chip
                                    text={RatingText}
                                    color={color?.lightVibrant ?? theme.palette.primary}
                                    icon={RatingIcon}
                                />
                            )}
                            {volumeInfo?.language && (
                                <Chip
                                    text={LanguageText}
                                    color={color?.lightVibrant ?? theme.palette.primary}
                                    icon={LanguageIcon}
                                />
                            )}
                        </View>
                        <View style={styles.separator}></View>
                        <Header title={'book:plot'} color={theme.palette.onBackground} />
                        <BaseText
                            variant={'body'}
                            size={'large'}
                            color={theme.palette.onBackground}>
                            {volumeInfo?.description ?? 'book:no-plot'}
                        </BaseText>
                    </View>
                </Scaffold>
            </ScrollView>
            {isBook(bookState) && (
                <TouchableOpacity style={footerStyle} onPress={handleOnAdd}>
                    <PlusIcon color={color?.onAverage} />
                    <BaseText
                        variant={'title'}
                        size={'medium'}
                        color={titleColor}
                        textTransform={'uppercase'}>
                        book:add
                    </BaseText>
                </TouchableOpacity>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    column: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10
    },
    headerContainer: {
        width: '100%',
        height: 200,
        paddingHorizontal: 20
    },
    header: {
        width: '100%',
        height: 50
    },
    headerActions: {
        width: '20%'
    },
    emptyScaffold: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    scaffold: {
        paddingHorizontal: 50
    },
    body: { flex: 1, gap: 10, position: 'relative', top: -100 },
    imageSection: {
        gap: 25
    },
    imageContainer: { width: '70%', height: 300, flexDirection: 'row' },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        backgroundColor: 'black',
        borderRadius: 20
    },
    container: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        gap: 5,
        alignItems: 'center'
    },
    separator: { width: '100%', borderBottomWidth: 1 },
    footer: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    reviewContainer: {
        height: 30,
        width: 65,
        gap: 5,
        flexDirection: 'row'
    },
    tags: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    }
});

export default BookScreen;
