import * as React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { Book } from '../../../api/googleBooksApi/models/book';
import { useAppSelector, useAppTheme } from '../../../state/hooks';
import { BookData } from '../../../utils/models/bookData';
import { useGetBookByIsbnQuery } from '../../../api/googleBooksApi/googleBooksApi';
import { BestSellerBook } from '../../../api/newYorkTimesApi/models/bestSellers';

//-- Props
// define props
interface BestSellerCardProps {
  bestSeller: BestSellerBook;
  onPress: (book: BookData) => void;
}
const BestSellerCard = (props: BestSellerCardProps) => {
  //-- Hooks
  // get theme colors
  const { colors } = useAppTheme();

  // get book data
  const { data, isFetching, error } = useGetBookByIsbnQuery(
    props.bestSeller.book_details[0].primary_isbn13,
  );

  // get bookshelf
  const books: BookData[] = useAppSelector(store => store.bookshelf.bookshelf);

  // state for image source
  const [imageSource, setImageSource] = React.useState<string>('');

  // set image source on data change
  React.useEffect(() => {
    if (data) setSource(data);
  }, [data]);

  //Methods
  /**
   * Sets image source based on book
   * @param book - book to get image source from
   */
  const setSource = (book: Book) => {
    setImageSource(
      book.volumeInfo?.imageLinks?.extraLarge ||
        book.volumeInfo?.imageLinks?.large ||
        book.volumeInfo?.imageLinks?.medium ||
        book.volumeInfo?.imageLinks?.small ||
        book.volumeInfo?.imageLinks?.thumbnail ||
        book.volumeInfo?.imageLinks?.smallThumbnail ||
        '',
    );
  };

  // -- Render
  return (
    <TouchableOpacity
      disabled={isFetching || !imageSource}
      activeOpacity={0.7}
      onPress={() => {
        props.onPress(
          books.find(b => b.book.id === data?.id) ?? {
            book: data!,
            currentPage: 0,
            favorite: false,
            removed: true,
          },
        );
      }}>
      <View
        style={{
          ...styles.card,
          opacity: books.some(b => !b.removed && b.book.id === data?.id)
            ? 0.3
            : 1,
          backgroundColor: colors.inverseSurface,
        }}>
        {isFetching ? (
          <ActivityIndicator />
        ) : imageSource && data ? (
          <Image
            style={styles.image}
            source={{
              uri: imageSource,
            }}
          />
        ) : data ? (
          <Text style={{ color: colors.surface }}>
            {data.volumeInfo?.title}
          </Text>
        ) : (
          <></>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width * 0.45,
    flex: 0.3,
    borderRadius: 5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 5,
    resizeMode: 'contain',
    opacity: 1,
  },
});

export default BestSellerCard;
