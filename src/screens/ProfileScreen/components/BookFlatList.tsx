import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, ScrollView } from 'react-native';
import { BookData } from '../../../utils/models/bookData';
import BookCard from './BookCard';
import EmptyBookCard from './EmptyBookCard';

//-- Props
// define props
interface BookListProps {
  data: BookData[];
  limited: boolean;
  setOpenedBook: (book: BookData) => void;
}

const BookFlatList = ({ data, limited, setOpenedBook }: BookListProps) => {
  //-- Hooks
  // get translation
  const { t, i18n } = useTranslation();

  //state for books
  const [books, setBooks] = React.useState<BookData[]>([]);

  // set books on load
  React.useEffect(() => {
    if (data.length < 7) {
      setBooks(data);
    } else {
      setBooks(data.slice(0, 6));
    }
  }, []);

  // set books on data change
  React.useEffect(() => {
    if (data.length < 7) {
      setBooks(data);
    } else {
      setBooks(data.slice(0, 6));
    }
  }, [data]);

  // set books on limited change
  React.useEffect(() => {
    if (data.length < 7) {
      setBooks(data);
    } else if (limited) {
      setBooks(data.slice(0, 6));
    } else {
      setBooks(data);
    }
  }, [limited]);

  //-- Render
  return (
    <ScrollView horizontal>
      <FlatList
        data={books}
        renderItem={({ item }) => (
          <BookCard
            bookData={item}
            onPress={() => {
              setOpenedBook(item);
            }}
          />
        )}
        ListEmptyComponent={<EmptyBookCard label={t('EMPTY_LIST')} />}
        numColumns={3}
        scrollEnabled={false}
        contentContainerStyle={{ flexGrow: 1, paddingVertical: 20 }}
      />
    </ScrollView>
  );
};

export default BookFlatList;
