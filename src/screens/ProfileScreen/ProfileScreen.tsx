import { BottomSheetModal } from '@gorhom/bottom-sheet';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Text } from 'react-native-paper';
import { useAppSelector } from '../../state/hooks';
import { BookData } from '../../utils/models/bookData';
import BookBottomSheetModal from '../GalleryScreen/components/BookBottomSheetModal/BookBottomSheetModal';
import BookFlatList from './components/BookFlatList';
import TimeCard from './components/TimeCard';
import ReadedCard from './components/ReadedCard';
import { useTranslation } from 'react-i18next';

const ProfileScreen = () => {
  //-- Hooks
  // get translation
  const { t, i18n } = useTranslation();
  //list of all added books
  const books = useAppSelector(store => store.bookshelf.bookshelf);

  //list of all added books that are not removed
  const bookshelf = useAppSelector(store =>
    store.bookshelf.bookshelf.filter(b => !b.removed),
  );

  //list of all added books that are not removed and are favorites
  const favorites = useAppSelector(store =>
    store.bookshelf.bookshelf.filter(b => b.favorite && !b.removed),
  );

  //define the reading time in milliseconds (default 0)
  const [readingTime, setReadingTime] = React.useState<number>(0);

  //define the opened book (default null)
  const [openedBook, setOpenedBook] = React.useState<BookData | null>(null);

  //define the limit of books to show in the bookshelf flatlist (default true)
  const [limitBookshelf, setLimitBookshelf] = React.useState<boolean>(true);

  //define the limit of books to show in the favorites flatlist (default true)
  const [limitFavorites, setLimitFavorites] = React.useState<boolean>(true);

  //define the bottom sheet modal ref
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  //open the bottom sheet modal
  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, [bottomSheetModalRef]);

  //calculate the reading time
  React.useEffect(() => {
    setReadingTime(
      ((books.map(b => b.currentPage).reduce((a, b) => a + b, 0) * 450) / 250) *
        60000,
    );
  }, [books]);

  //open the bottom sheet modal when a book is pressed
  React.useEffect(() => {
    handlePresentModalPress();
  }, [openedBook]);

  //-- Render
  return (
    <>
      <ScrollView>
        <View style={{ ...styles.sectionTitle, paddingVertical: 20 }}>
          <Text variant="titleLarge">{t('STATS')}</Text>
        </View>
        <View style={styles.statisticSection}>
          <TimeCard time={readingTime} />
          <ReadedCard
            num={
              books.filter(b => b.currentPage === b.book.volumeInfo?.pageCount)
                .length
            }
          />
        </View>

        <View style={styles.sectionTitle}>
          <Text variant="titleLarge">{t('MY_BOOKS')}</Text>
          {bookshelf.length >= 7 ? (
            <Button onPress={() => setLimitBookshelf(!limitBookshelf)}>
              {limitBookshelf ? t('MORE') : t('LESS')}
            </Button>
          ) : (
            <></>
          )}
        </View>
        <BookFlatList
          data={bookshelf.reverse()}
          limited={limitBookshelf}
          setOpenedBook={book => setOpenedBook(book)}
        />

        <View style={styles.sectionTitle}>
          <Text variant="titleLarge">{t('MY_FAVORITES')}</Text>

          {favorites.length >= 7 ? (
            <Button onPress={() => setLimitFavorites(!limitFavorites)}>
              {limitFavorites ? t('MORE') : t('LESS')}
            </Button>
          ) : (
            <></>
          )}
        </View>

        <BookFlatList
          data={favorites.reverse()}
          limited={limitFavorites}
          setOpenedBook={book => setOpenedBook(book)}
        />
      </ScrollView>
      {openedBook ? (
        <BookBottomSheetModal
          bottomSheetModalRef={bottomSheetModalRef}
          id={openedBook.book.id}
          onDismiss={() => setOpenedBook(null)}
        />
      ) : (
        <></>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  statisticSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  sectionTitle: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ProfileScreen;
