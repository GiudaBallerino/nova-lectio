import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ActivityIndicator, StyleSheet } from 'react-native';
import Navigation from './components/navigation/Navigation';
import useOnResume from './hooks/useOnResume';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { PortalProvider } from '@gorhom/portal';
import { I18nextProvider } from 'react-i18next';

function App() {
    // Hooks
    useOnResume();

    // Render
    return <Navigation />;
}

function Providers() {
    // Render
    return (
        <GestureHandlerRootView style={styles.main}>
            <Provider store={store}>
                <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
                    <PortalProvider>
                        <App />
                    </PortalProvider>
                </PersistGate>
            </Provider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    main: { flex: 1 }
});

export default Providers;
