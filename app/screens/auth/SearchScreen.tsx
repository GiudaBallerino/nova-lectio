import { useCallback, useMemo } from 'react';
import Scaffold from '../../components/commons/Scaffold';
import SearchBar from '../../components/commons/SearchBar';
import * as React from 'react';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { SearchParameter } from '../../types/structs';
import SearchProvider, { SearchContext } from '../../components/providers/SearchProvider';
import { FlatList, StyleSheet, View } from 'react-native';
import BookCard from '../../components/commons/BookCard';
import { Book, BookData } from '../../types/entities';
import { isBook } from '../../utils/typeCheck';
import useTheme from '../../hooks/useTheme';
import { useNavigation } from '@react-navigation/native';

const initialParameter: SearchParameter = {
    query: ''
};

//todo implement filters
//todo implement recently opened

function SearchScreen() {
    // Hooks
    const navigation = useNavigation<any>();
    const theme = useTheme();

    // Memos
    const SearchButton = useMemo(
        () => <MagnifyingGlassIcon color={theme.palette.onSecondary} />,
        [theme]
    );

    // const FilterButton = useMemo(
    //     () => (
    //         <AdjustmentsVerticalIcon
    //             onPress={() => showAlert('test', 'test')}
    //             color={theme.palette.onSecondary}
    //         />
    //     ),
    //     [theme]
    // );

    // Callbacks
    const handleOnPress = useCallback(
        (book: Book | BookData) => navigation.push('Book', { book }),
        []
    );

    const renderCard = useCallback(
        ({ item }: { item: Book | BookData }) =>
            isBook(item) ? (
                <BookCard
                    title={item.volumeInfo?.title!}
                    source={item.volumeInfo.imageLinks?.thumbnail}
                    authors={item.volumeInfo.authors!}
                    onPress={() => handleOnPress(item)}
                    type='oneLine'
                />
            ) : (
                <BookCard
                    title={item.book.volumeInfo?.title!}
                    source={item.book.volumeInfo.imageLinks?.thumbnail}
                    authors={item.book.volumeInfo.authors!}
                    onPress={() => handleOnPress(item)}
                    type='oneLine'
                />
            ),
        []
    );

    return (
        <SearchProvider initialValues={initialParameter}>
            <SearchContext.Consumer>
                {context => (
                    <Scaffold>
                        <SearchBar
                            autoFocus={true}
                            actions={[SearchButton]}
                            value={context.query.query}
                            onChangeText={t => context.setQueryParameter('query', t)}
                        />
                        <FlatList
                            data={context.results.data}
                            renderItem={renderCard}
                            keyExtractor={item => (isBook(item) ? item.id : item.book.id)}
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
                        />
                    </Scaffold>
                )}
            </SearchContext.Consumer>
        </SearchProvider>
    );
}
const styles = StyleSheet.create({
    separator: {
        height: 5
    }
});

export default SearchScreen;
