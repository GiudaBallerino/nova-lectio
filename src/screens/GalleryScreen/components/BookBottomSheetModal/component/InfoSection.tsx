import * as React from 'react';
import {
  useWindowDimensions,
  View,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { Text } from 'react-native-paper';
import SwitchButton from '../../../../../common/SwitchButton';
import { useAppTheme } from '../../../../../state/hooks';
import { BookData } from '../../../../../utils/models/bookData';

//-- Props
// define props
interface InfoSectionProps {
  bookData: BookData;
  onRemove: () => void;
  onAdd: () => void;
  onSet: () => void;
}

const InfoSection = (props: InfoSectionProps) => {
  //-- Constants
  // get window width
  const imageWidth = Dimensions.get('window').width * 0.3;

  // calculate reading time
  const readingTime =
    (((props.bookData.book.volumeInfo?.pageCount ?? 0) * 450) / 250) * 60000;

  // get image source
  const imageSource: string =
    props.bookData.book.volumeInfo?.imageLinks?.extraLarge ||
    props.bookData.book.volumeInfo?.imageLinks?.large ||
    props.bookData.book.volumeInfo?.imageLinks?.medium ||
    props.bookData.book.volumeInfo?.imageLinks?.small ||
    props.bookData.book.volumeInfo?.imageLinks?.thumbnail ||
    props.bookData.book.volumeInfo?.imageLinks?.smallThumbnail ||
    '';

  // calculate progress
  const progress: number = props.bookData.book.volumeInfo?.pageCount
    ? props.bookData.book.volumeInfo?.pageCount !== 0
      ? props.bookData.currentPage / props.bookData.book.volumeInfo?.pageCount
      : 1
    : 1;

  //-- Hooks
  // get theme colors
  const { colors } = useAppTheme();
  //state for image height
  const [imageHeigh, setImageHeight] = React.useState<number>(0);
  // set image height on load
  React.useEffect(() => {
    scaleHeight(imageSource, imageWidth);
  }, []);

  //-- Methods
  /**
   * Scale image height
   * @param {string} source - image source
   * @param {number} desiredWidth - desired width
   * @returns {void}
   */
  const scaleHeight = (source: string, desiredWidth: number) => {
    if (source === '') {
      setImageHeight((desiredWidth / 400) * 640);
    } else {
      Image.getSize(source, (width, height) => {
        setImageHeight((desiredWidth / width) * height);
      });
    }
  };

  /**
   * Format duration
   * @param {number} ms - milliseconds
   * @returns {string} - formatted duration
   */
  const formatDuration = (ms: number) => {
    if (ms < 0) ms = -ms;
    const time = {
      g: Math.floor(ms / 86400000),
      o: Math.floor(ms / 3600000) % 24,
      m: Math.floor(ms / 60000) % 60,
    };
    return Object.entries(time)
      .filter(val => val[1] !== 0)
      .map(([key, val]) => `${val}${key}`)
      .join(', ');
  };

  //-- Render
  return (
    <View
      style={{
        ...styles.section,
        height: imageHeigh + 30,
      }}>
      {imageSource ? (
        <Image
          style={{
            ...styles.image,
            width: imageWidth,
            height: imageHeigh,
          }}
          source={{
            uri: imageSource,
          }}
        />
      ) : (
        <View
          style={{
            ...styles.emptyImage,
            backgroundColor: colors.inverseSurface,
            width: imageWidth,
            height: imageHeigh,
          }}
        />
      )}
      <View
        style={{
          ...styles.container,
          backgroundColor: colors.tertiaryContainer,
          height: imageHeigh * 0.75 > 220 ? imageHeigh * 0.75 : 120,
          paddingLeft: imageWidth + 30,
        }}>
        <View style={styles.info}>
          <View
            style={{
              ...styles.tag,
              backgroundColor: colors.onTertiaryContainer,
            }}>
            <Text style={{ color: colors.tertiaryContainer }}>
              {props.bookData.book.volumeInfo?.language?.toUpperCase()}
            </Text>
          </View>

          {props.bookData.book.volumeInfo?.pageCount &&
          props.bookData.book.volumeInfo?.pageCount > 0 ? (
            <Text
              variant="displayMedium"
              style={{ color: colors.onTertiaryContainer }}>
              {(progress * 100).toFixed(0)}%
            </Text>
          ) : (
            <></>
          )}
          {props.bookData.book.volumeInfo?.pageCount &&
          props.bookData.book.volumeInfo?.pageCount > 0 ? (
            <Text
              variant="titleSmall"
              style={{ color: colors.onTertiaryContainer }}>
              Tempo: {formatDuration(readingTime)}
            </Text>
          ) : (
            <></>
          )}
        </View>
        <View style={styles.action}>
          <SwitchButton
            status={props.bookData.favorite}
            icons={['heart-off-outline', 'heart']}
            size={15}
            onTrue={props.onSet}
            onFalse={props.onSet}
          />
          <SwitchButton
            status={!props.bookData.removed}
            icons={['book-off', 'book-plus']}
            size={15}
            onTrue={props.onRemove}
            onFalse={props.onAdd}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    width: '100%',
    paddingLeft: 20,
    justifyContent: 'center',
  },
  image: {
    borderRadius: 5,
    resizeMode: 'contain',
    zIndex: 1,
  },
  emptyImage: {
    borderRadius: 5,
    zIndex: 1,
  },
  action: {
    justifyContent: 'space-between',
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  container: {
    width: Dimensions.get('window').width - 60,
    position: 'absolute',
    flexDirection: 'row',
    paddingVertical: 10,
    borderRadius: 20,
  },
  tag: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    height: 32,
  },
});
export default InfoSection;
