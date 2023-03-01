import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MD3DarkTheme, Text } from 'react-native-paper';
import { useAppTheme } from '../../../state/hooks';

//-- Props
// define props
interface TimeCardProps {
  time: number;
}
const TimeCard = ({ time }: TimeCardProps) => {
  //-- Hooks
  // get translation
  const { t, i18n } = useTranslation();

  // get theme colors
  const { colors } = useAppTheme();

  //-- Methods
  /**
   * Format duration
   * @param ms - milliseconds
   * @returns {object} - formatted duration
   */
  const formatDuration = (ms: number) => {
    if (ms < 0) ms = -ms;
    const time = {
      month: Math.floor(ms / (86400000 * 30)),
      day: Math.floor(ms / 86400000) % 30,
      hour: Math.floor(ms / 3600000) % 24,
    };
    return time;
  };

  //-- Render
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: colors.tertiaryContainer,
      }}>
      <View style={styles.title}>
        <Text variant="titleMedium">{t('READING_TIME')}</Text>
      </View>
      <View style={styles.statisticSection}>
        <View style={styles.content}>
          <Text variant="bodyLarge">{formatDuration(time).month}</Text>
          <Text variant="labelMedium">{t('MONTHS')}</Text>
        </View>
        <View style={styles.content}>
          <Text variant="bodyLarge">{formatDuration(time).day}</Text>
          <Text variant="labelMedium">{t('DAYS')}</Text>
        </View>
        <View style={styles.content}>
          <Text variant="bodyLarge">{formatDuration(time).hour}</Text>
          <Text variant="labelMedium">{t('HOURS')}</Text>
        </View>
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

export default TimeCard;
