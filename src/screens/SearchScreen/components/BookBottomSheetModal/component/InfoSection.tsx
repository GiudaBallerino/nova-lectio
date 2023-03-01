import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import SwitchButton from '../../../../../common/SwitchButton';
import { useAppTheme } from '../../../../../state/hooks';
import { BookData } from '../../../../../utils/models/bookData';

//-- Props
//define props
interface InfoSectionProps {
  bookData: BookData;
  onRemove: () => void;
  onAdd: () => void;
}

const InfoSection = (props: InfoSectionProps) => {
  //-- Const
  // get translation
  const { t, i18n } = useTranslation();
  //set image width
  const imageWidth = Dimensions.get('window').width * 0.3;

  //set stimated reading time (page_count * word_for_page / page_for_minute)
  const readingTime =
    (((props.bookData.book.volumeInfo?.pageCount ?? 0) * 450) / 250) * 60000;

  //set image source
  const imageSource: string =
    props.bookData.book.volumeInfo?.imageLinks?.extraLarge ||
    props.bookData.book.volumeInfo?.imageLinks?.large ||
    props.bookData.book.volumeInfo?.imageLinks?.medium ||
    props.bookData.book.volumeInfo?.imageLinks?.small ||
    props.bookData.book.volumeInfo?.imageLinks?.thumbnail ||
    props.bookData.book.volumeInfo?.imageLinks?.smallThumbnail ||
    '';

  //set progress
  const progress: number = props.bookData.book.volumeInfo?.pageCount
    ? props.bookData.book.volumeInfo?.pageCount !== 0
      ? props.bookData.currentPage / props.bookData.book.volumeInfo?.pageCount
      : 1
    : 1;

  //-- Hooks
  //get theme
  const { colors } = useAppTheme();

  //image height
  const [imageHeigh, setImageHeight] = React.useState<number>(0);

  //on load calculate image height from image width
  React.useEffect(() => {
    scaleHeight(imageSource, imageWidth);
  }, []);

  //Methods
  /**
   * Scale image height from image width
   * @param source image source
   * @param desiredWidth image width
   * @returns void
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
   * @param ms duration in milliseconds
   * @returns string
   */
  const formatDuration = (ms: number) => {
    if (ms < 0) ms = -ms;
    const time = {
      D: Math.floor(ms / 86400000),
      H: Math.floor(ms / 3600000) % 24,
      M: Math.floor(ms / 60000) % 60,
    };
    return Object.entries(time)
      .filter(val => val[1] !== 0)
      .map(([key, val]) => `${val}${t(key)}`)
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
          }}>
          <Text>{props.bookData.book.volumeInfo?.title}</Text>
        </View>
      )}
      <View
        style={{
          ...styles.container,
          backgroundColor: colors.tertiaryContainer,
          height: imageHeigh * 0.75 > 120 ? imageHeigh * 0.75 : 120,
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
              {t('TIME')}: {formatDuration(readingTime)}
            </Text>
          ) : (
            <></>
          )}
        </View>
        <View style={styles.action}>
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
    justifyContent: 'center',
    alignItems: 'center',
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
