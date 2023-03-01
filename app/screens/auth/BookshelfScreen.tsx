import { useCallback, useContext, useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { TabStackParamList } from '../../types/navigation';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { BookData } from '../../types/entities';
import * as React from 'react';
import BookCard from '../../components/commons/BookCard';
import Scaffold from '../../components/commons/Scaffold';
import useAppSelector from '../../hooks/useAppSelector';
import { BookContext } from '../../components/providers/BookProvider';
import { useNavigation } from '@react-navigation/native';

//todo implement filters

type BookshelfScreenProps = NativeStackScreenProps<TabStackParamList>;
function BookshelfScreen({
    route: {
        params: { folder }
    }
}: BookshelfScreenProps) {
    // Hooks
    const navigation = useNavigation<any>();
    const books: BookData[] = useAppSelector(store => store.bookshelf.bookshelf);
    const { open } = useContext(BookContext);

    // Memos
    const filteredBooks = useMemo<BookData[]>(
        () => books.filter(b => b.folders.includes(folder)),
        [books, folder]
    );

    // Callbacks
    const handleOnPress = useCallback((book: BookData) => navigation.push('Book', { book }), []);
    const handleOnLongPress = useCallback((book: BookData) => open(book), []);
    const renderCard = useCallback(
        ({ item }: { item: BookData }) => (
            <BookCard
                title={item.book.volumeInfo?.title!}
                source={item.book.volumeInfo.imageLinks?.thumbnail}
                pageCount={item.book.volumeInfo.pageCount}
                currentPage={item.currentPage}
                authors={item.book.volumeInfo.authors!}
                onPress={() => handleOnPress(item)}
                onLongPress={() => handleOnLongPress(item)}
                showPercent={true}
            />
        ),
        []
    );

    return (
        <Scaffold>
            <FlatList
                data={filteredBooks}
                renderItem={renderCard}
                numColumns={2}
                keyExtractor={item => item.book.id}
                columnWrapperStyle={styles.columnWrapper}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </Scaffold>
    );
}
const styles = StyleSheet.create({
    columnWrapper: {
        justifyContent: 'space-between'
    },
    separator: {
        height: 10
    }
});
export default BookshelfScreen;
