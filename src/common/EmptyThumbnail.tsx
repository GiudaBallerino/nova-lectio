import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Card, MD3DarkTheme, Searchbar } from 'react-native-paper';
import { useAppTheme } from '../state/hooks';

const EmptyThumbnail = () => {
  //-- Hooks
  // get theme colors
  const { colors } = useAppTheme();

  //-- Render
  return (
    <Card.Cover
      style={{
        ...styles.empty_thumbnail,
        backgroundColor: colors.tertiaryContainer,
      }}
      resizeMode="cover"
    />
  );
};

const styles = StyleSheet.create({
  empty_thumbnail: {
    height: 80,
    width: 60,
  },
});

export default EmptyThumbnail;
