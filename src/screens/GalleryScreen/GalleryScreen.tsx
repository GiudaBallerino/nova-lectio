import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
} from 'react-native-paper';
import Readed from './tabs/Readed';
import Reading from './tabs/Reading';
import ToRead from './tabs/ToRead';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import merge from 'deepmerge';
import { useAppTheme } from '../../state/hooks';
import { useTranslation } from 'react-i18next';

// adapt react navigation theme to react native paper theme
const { DarkTheme, LightTheme } = adaptNavigationTheme({
  reactNavigationDark: NavigationDarkTheme,
  reactNavigationLight: NavigationDefaultTheme,
});

const GalleryScreen = () => {
  //-- Hooks
  // get translation
  const { t, i18n } = useTranslation();

  // get theme colors
  const { dark, colors } = useAppTheme();

  //-- Constants
  // create tab navigator
  const Tab = createMaterialTopTabNavigator();

  // merge themes
  const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);
  const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);

  // set theme
  const theme = dark ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIndicatorStyle: styles.indicator,
        })}>
        <Tab.Screen name={t('TAB_READING')} component={Reading} />
        <Tab.Screen name={t('TAB_TOREAD')} component={ToRead} />
        <Tab.Screen name={t('TAB_READED')} component={Readed} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: MD3DarkTheme.colors.primary,
  },
});

export default GalleryScreen;
