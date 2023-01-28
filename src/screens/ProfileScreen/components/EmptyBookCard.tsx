import * as React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { MD3DarkTheme, Text } from 'react-native-paper';
import { useAppTheme } from '../../../state/hooks';

//-- Props
// define props
interface EmptyBookCardProps {
  label: string;
}

const EmptyBookCard = (props: EmptyBookCardProps) => {
  //-- Hooks
  // get theme colors
  const { colors } = useAppTheme();

  //-- Render
  return (
    <View style={{ ...styles.card, backgroundColor: colors.inverseSurface }}>
      <Text style={{ color: colors.surface }}>{props.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width * 0.45,
    flex: 0.3,
    borderRadius: 5,
    backgroundColor: MD3DarkTheme.colors.inverseSurface,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EmptyBookCard;
