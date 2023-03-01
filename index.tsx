/**
 * @format
 */

import { Appearance, AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { store, persistor } from './src/state/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {
  MD3DarkTheme,
  MD3LightTheme,
  Provider as PaperProvider,
  useTheme,
} from 'react-native-paper';
import React from 'react';
import i18n from './src/i18n/i18n';
import { I18nextProvider } from 'react-i18next';

// get the color scheme from the device
const colorScheme = Appearance.getColorScheme();

// set the theme based on the color scheme
const theme =
  colorScheme === 'dark' ? { ...MD3DarkTheme } : { ...MD3LightTheme };

// export the theme type
export type AppTheme = typeof theme;

AppRegistry.registerComponent(appName, () => () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <PaperProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </PaperProvider>
    </PersistGate>
  </Provider>
));
