import * as React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';
import { Book } from '../../../api/googleBooksApi/models/book';
import { useAppSelector, useAppTheme } from '../../../state/hooks';
import { BookData } from '../../../utils/models/bookData';

//-- Props
// define props
interface BookCardProps {
  book: Book;
  onPress: (book: BookData) => void;
}
const BookCard = (props: BookCardProps) => {
  //-- Constants
  // get image source
  const imageSource =
    props.book.volumeInfo?.imageLinks?.extraLarge ||
    props.book.volumeInfo?.imageLinks?.large ||
    props.book.volumeInfo?.imageLinks?.medium ||
    props.book.volumeInfo?.imageLinks?.small ||
    props.book.volumeInfo?.imageLinks?.thumbnail ||
    props.book.volumeInfo?.imageLinks?.smallThumbnail ||
    '';

  //-- Hooks
  // get theme colors
  const { colors } = useAppTheme();
  const books: BookData[] = useAppSelector(store => store.bookshelf.bookshelf);

  // -- Render
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        props.onPress(
          books.find(b => b.book.id === props.book.id) ?? {
            book: props.book,
            currentPage: 0,
            favorite: false,
            removed: true,
          },
        );
      }}>
      <View
        style={{
          ...styles.card,
          opacity: books.some(b => b.book.id === props.book?.id) ? 0.3 : 1,
          backgroundColor: colors.inverseSurface,
        }}>
        {imageSource ? (
          <Image
            style={styles.image}
            source={{
              uri: imageSource,
            }}
          />
        ) : props.book ? (
          <Text style={{ color: colors.surface }}>
            {props.book.volumeInfo?.title}
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

export default BookCard;
