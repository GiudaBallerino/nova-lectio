import * as React from 'react';
import { IconButton, MD3DarkTheme, Text } from 'react-native-paper';
import { useAppTheme } from '../state/hooks';

//-- Props
// define props
interface Props {
  status: boolean;
  icons: string[];
  size: number;
  onTrue: () => void;
  onFalse: () => void;
}

const SwitchButton = (props: Props) => {
  //-- Hooks
  // get theme colors
  const { colors } = useAppTheme();

  //-- Render
  return props.status ? (
    <IconButton
      icon={props.icons[0]}
      mode="outlined"
      containerColor={colors.onTertiary}
      iconColor={colors.onTertiaryContainer}
      style={{ borderColor: colors.onTertiary }}
      size={props.size}
      onPress={props.onTrue}
    />
  ) : (
    <IconButton
      icon={props.icons[1]}
      mode="outlined"
      iconColor={colors.onTertiary}
      style={{ borderColor: colors.onTertiary }}
      size={props.size}
      onPress={props.onFalse}
    />
  );
};

export default SwitchButton;
