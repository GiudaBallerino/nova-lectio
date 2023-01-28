import * as React from 'react';
import { BottomNavigation, MD3DarkTheme, Text } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from './src/state/hooks';
import routes from './src/routes';
import SearchScreen from './src/screens/SearchScreen/SearchScreen';
import GalleryScreen from './src/screens/GalleryScreen/GalleryScreen';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';

const App = () => {
  //-- Hooks

  // State for bottom navigation
  const [index, setIndex] = React.useState<number>(0);

  // function to render the scenes
  const renderScene = BottomNavigation.SceneMap({
    gallery: GalleryScreen,
    search: SearchScreen,
    profile: ProfileScreen,
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <BottomNavigation
          labeled={false}
          navigationState={{ index, routes }}
          onIndexChange={i => setIndex(i)}
          renderScene={renderScene}
          barStyle={{
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;
