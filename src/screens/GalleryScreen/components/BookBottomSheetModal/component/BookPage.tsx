import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import {
  setFavorite,
  setRemoved,
  updateCurrentPage,
} from '../../../../../state/bookshelf/bookshelfSlice';
import { useAppSelector, useAppDispatch } from '../../../../../state/hooks';
import { BookData } from '../../../../../utils/models/bookData';

import ContentSection from './ContentSection';
import InfoSection from './InfoSection';
import PageSection from './PageSection';

//-- Props
// define props
interface BookPageProps {
  id?: string;
}

const BookPage = (props: BookPageProps) => {
  //-- Hooks

  // get books
  const books: BookData[] = useAppSelector(store => store.bookshelf.bookshelf);

  // get dispatch
  const dispatch = useAppDispatch();

  // state for book index
  const [bookIndex, setBookIndex] = React.useState<number>(0);

  // set book index on load
  React.useEffect(() => {
    setBookIndex(books.findIndex(b => b.book.id === props.id));
  }, []);

  //-- Methods
  /**
   * Set book as favorite
   * @returns void
   */
  const setFavoriteBook = () => {
    dispatch(setFavorite({ index: bookIndex }));
  };

  /**
   * Set book as removed
   * @returns void
   */
  const setBookRemoved = () => {
    dispatch(setRemoved({ index: bookIndex }));
  };

  /**
   * Update current page
   * @param data - number to add to current page
   * @returns void
   */
  const updatePage = (data: number) => {
    if (books[bookIndex].currentPage + data < 0) {
      dispatch(
        updateCurrentPage({
          index: bookIndex,
          page: 0,
        }),
      );
    } else if (
      books[bookIndex].currentPage + data >
      (books[bookIndex]?.book?.volumeInfo?.pageCount ?? 0)
    ) {
      dispatch(
        updateCurrentPage({
          index: bookIndex,
          page: books[bookIndex]?.book?.volumeInfo?.pageCount ?? 0,
        }),
      );
    } else {
      dispatch(
        updateCurrentPage({
          index: bookIndex,
          page: books[bookIndex].currentPage + data,
        }),
      );
    }
  };

  //-- Render
  return (
    <ScrollView style={styles.scaffold}>
      <InfoSection
        bookData={books[bookIndex]}
        onAdd={setBookRemoved}
        onRemove={setBookRemoved}
        onSet={setFavoriteBook}
      />
      {(books[bookIndex].book.volumeInfo?.pageCount || 0) > 0 ? (
        <PageSection
          bookData={books[bookIndex]}
          onUpdate={data => updatePage(data)}
        />
      ) : (
        <></>
      )}
      <ContentSection bookData={books[bookIndex]} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scaffold: {
    paddingHorizontal: 30,
  },
});

export default BookPage;
