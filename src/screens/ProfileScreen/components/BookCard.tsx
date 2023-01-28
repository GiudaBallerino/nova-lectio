import * as React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '../../../state/hooks';
import { BookData } from '../../../utils/models/bookData';

//-- Props
// define props
interface BookCardProps {
  bookData: BookData;
  onPress: () => void;
}
const BookCard = (props: BookCardProps) => {
  //-- Hooks
  // get theme colors
  const { colors } = useAppTheme();

  //-- Costants
  // get image source
  const imageSource =
    props.bookData.book.volumeInfo?.imageLinks?.extraLarge ||
    props.bookData.book.volumeInfo?.imageLinks?.large ||
    props.bookData.book.volumeInfo?.imageLinks?.medium ||
    props.bookData.book.volumeInfo?.imageLinks?.small ||
    props.bookData.book.volumeInfo?.imageLinks?.thumbnail ||
    props.bookData.book.volumeInfo?.imageLinks?.smallThumbnail ||
    '';

  //-- Render
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={props.onPress}>
      <View style={{ ...styles.card, backgroundColor: colors.inverseSurface }}>
        {imageSource ? (
          <Image
            style={styles.image}
            source={{
              uri: imageSource,
            }}
          />
        ) : props.bookData ? (
          <Text style={{ color: colors.inverseOnSurface }}>
            {props.bookData.book.volumeInfo?.title}
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
