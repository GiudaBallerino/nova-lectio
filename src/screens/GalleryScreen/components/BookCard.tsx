import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Card, MD3DarkTheme, ProgressBar } from 'react-native-paper';
import EmptyThumbnail from '../../../common/EmptyThumbnail';
import Thumbnail from '../../../common/Thumbnail';
import { useAppTheme } from '../../../state/hooks';
import { BookData } from '../../../utils/models/bookData';

//-- Props
// define props
interface BookCardProps {
  book: BookData;
}
const BookCard = (props: BookCardProps) => {
  //-- Hooks
  // get theme colors
  const { colors } = useAppTheme();

  //-- Methods
  // calculate progress
  const progress: number = props.book.book.volumeInfo?.pageCount
    ? props.book.book.volumeInfo?.pageCount !== 0
      ? props.book.currentPage / props.book.book.volumeInfo?.pageCount
      : 1
    : 1;

  // render thumbnail
  const thumbnail = () =>
    props.book.book.volumeInfo?.imageLinks &&
    props.book.book.volumeInfo?.imageLinks.thumbnail ? (
      <Thumbnail image={props.book.book.volumeInfo.imageLinks.thumbnail} />
    ) : (
      <EmptyThumbnail />
    );
  //-- Render
  return (
    <Card style={{ ...styles.card, backgroundColor: colors.tertiaryContainer }}>
      <Card.Title
        title={props?.book?.book?.volumeInfo?.title}
        subtitle={props?.book?.book?.volumeInfo?.authors?.join(', ')}
        left={thumbnail}
        style={styles.title}
        leftStyle={styles.thumbnail}
      />
      <ProgressBar progress={progress} color={colors?.primary} />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: '100%',
    marginBottom: 5,
    borderRadius: 0,
  },
  title: {
    marginHorizontal: 5,
    marginVertical: 10,
  },
  thumbnail: {
    height: 80,
    width: 60,
  },
});

export default BookCard;
