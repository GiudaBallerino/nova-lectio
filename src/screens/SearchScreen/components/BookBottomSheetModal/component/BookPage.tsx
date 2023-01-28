import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import {
  addBook,
  removeBook,
} from '../../../../../state/bookshelf/bookshelfSlice';
import { useAppSelector, useAppDispatch } from '../../../../../state/hooks';
import { BookData } from '../../../../../utils/models/bookData';

import ContentSection from './ContentSection';
import InfoSection from './InfoSection';
interface BookPageProps {
  bookData: BookData;
}

const BookPage = (props: BookPageProps) => {
  // -- Hooks
  //get the bookshelf
  const books: BookData[] = useAppSelector(store => store.bookshelf.bookshelf);

  //book index on bookshelf (default: -1)
  const [bookIndex, setBookIndex] = React.useState<number>(-1);

  // get dispatch
  const dispatch = useAppDispatch();

  //set book index (if book is not in bookshelf index: -1)
  React.useEffect(() => {
    setBookIndex(books.findIndex(b => b.book.id === props.bookData.book.id));
  }, []);

  //set book index when bookshelf is updated (if book is not in bookshelf index: -1)
  React.useEffect(() => {
    setBookIndex(books.findIndex(b => b.book.id === props.bookData.book.id));
  }, [books]);

  //-- Methods
  /**
   * Add book to bookshelf (or set removed as false)
   * @returns {void}
   */
  const addBookToBookshelf = () => {
    if (bookIndex !== -1) {
      dispatch(addBook({ book: books[bookIndex].book }));
    } else {
      dispatch(addBook({ book: props.bookData.book }));
    }
  };

  /**
   * set removed as true
   * @returns {void}
   */
  const removeBookFromBookshelf = () => {
    dispatch(removeBook({ id: books[bookIndex].book.id }));
  };

  //-- Render
  return (
    <ScrollView style={styles.scaffold}>
      <InfoSection
        bookData={bookIndex !== -1 ? books[bookIndex] : props.bookData}
        onAdd={addBookToBookshelf}
        onRemove={removeBookFromBookshelf}
      />
      <ContentSection
        bookData={bookIndex !== -1 ? books[bookIndex] : props.bookData}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scaffold: {
    paddingHorizontal: 30,
  },
});

export default BookPage;
