import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useAppTheme } from '../../../state/hooks';

//-- Props
// define props
interface ReadedCardProps {
  num: number;
}
const ReadedCard = ({ num }: ReadedCardProps) => {
  //-- Hooks
  // get translation
  const { t, i18n } = useTranslation();
  // get theme colors
  const { colors } = useAppTheme();

  //-- Render
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: colors.tertiaryContainer,
      }}>
      <View style={styles.title}>
        <Text variant="titleMedium">{t('READED_BOOKS')}</Text>
      </View>
      <View style={styles.content}>
        <Text variant="headlineMedium">{num}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statisticSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  container: {
    flex: 0.48,
    padding: 10,
    borderRadius: 10,
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ReadedCard;
