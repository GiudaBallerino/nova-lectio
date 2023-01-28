import { BottomSheetModal } from '@gorhom/bottom-sheet';
import * as React from 'react';
import {
  BackHandler,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {} from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import { BookData } from '../../../utils/models/bookData';
import BookBottomSheetModal from '../components/BookBottomSheetModal/BookBottomSheetModal';
import BookCard from '../components/BookCard';

const ToRead = () => {
  //Hooks
  // get books
  const books: BookData[] = useAppSelector(store => store.bookshelf.bookshelf);

  // state for opened book
  const [openedBook, setOpenedBook] = React.useState<BookData | null>(null);

  // ref for bottom sheet modal
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  // callback for opening bottom sheet modal
  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, [bottomSheetModalRef]);

  //open the bottom sheet modal when a book is pressed
  React.useEffect(() => {
    handlePresentModalPress();
  }, [openedBook]);

  //Methods
  /**
   * Filter books that are to read
   * @returns {BookData[]} filtered books
   */
  const filtredBooks: BookData[] = books.filter(
    b =>
      b.currentPage == 0 &&
      (b.book.volumeInfo?.pageCount ?? 0) > 0 &&
      !b.removed,
  );

  return (
    <ScrollView>
      {Array.isArray(filtredBooks) && filtredBooks.length ? (
        filtredBooks.map(book => {
          return (
            <TouchableOpacity
              key={book.book.id}
              activeOpacity={0.7}
              onPress={() => {
                setOpenedBook(book);
                handlePresentModalPress();
              }}>
              <BookCard book={book} />
            </TouchableOpacity>
          );
        })
      ) : (
        <></>
      )}
      {openedBook ? (
        <BookBottomSheetModal
          bottomSheetModalRef={bottomSheetModalRef}
          id={openedBook.book.id}
          onDismiss={() => setOpenedBook(null)}
        />
      ) : (
        <></>
      )}
    </ScrollView>
  );
};

export default ToRead;
