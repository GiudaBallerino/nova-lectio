import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '../../../../../state/hooks';
import { BookData } from '../../../../../utils/models/bookData';

//-- Props
// define props
interface ContentSectionProps {
  bookData: BookData;
}

const ContentSection = (props: ContentSectionProps) => {
  //-- Hooks
  // get theme colors
  const { colors } = useAppTheme();

  //-- Render
  return (
    <View style={styles.section}>
      <Text variant="titleSmall">
        {props?.bookData?.book?.volumeInfo?.authors?.join(', ')}
      </Text>
      <Text variant="titleLarge">{props.bookData.book.volumeInfo?.title}</Text>
      <View
        style={{
          ...styles.description,
          backgroundColor: colors.secondaryContainer,
        }}>
        {props.bookData.book.volumeInfo?.description ? (
          <Text variant="bodyMedium">
            {props.bookData.book.volumeInfo?.description}
          </Text>
        ) : (
          <Text variant="bodyMedium">Nessuna descrizione</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: 30,
  },
  description: {
    width: '100%',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ContentSection;
