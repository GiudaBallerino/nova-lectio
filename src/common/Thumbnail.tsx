import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Card, Searchbar } from 'react-native-paper';

//-- Props
// define props
interface ThumbnailProps {
  image: string;
}

const Thumbnail = (props: ThumbnailProps) => {
  //-- Render
  return (
    <Card.Cover
      style={styles.thumbnail}
      source={{ uri: props.image }}
      resizeMode="cover"
    />
  );
};

const styles = StyleSheet.create({
  thumbnail: {
    height: 80,
    width: 60,
  },
});

export default Thumbnail;
