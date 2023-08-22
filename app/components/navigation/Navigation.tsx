// React
import React, {useCallback, useMemo} from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthenticatedView from '../../views/AuthenticatedView';
import UnauthenticatedView from '../../views/UnauthenticatedView';
import BookProvider from '../providers/BookProvider';
import useTheme from "../../hooks/useTheme";

function Navigation() {
    const theme = useTheme();

    const customTheme = useMemo(()=>({
        dark: theme.dark,
        colors: {
            primary: theme.palette.primary,
            background: theme.palette.background,
            card: theme.palette.surface,
            text: theme.palette.onBackground,
            border: theme.palette.outline,
            notification: theme.palette.error,
        },
    }),[theme]);

    // Callbacks
    const renderView = useCallback(() => {
        if (true) {
            return <AuthenticatedView />;
        } else if (false) {
            return <UnauthenticatedView />;
        } else {
            return <View />;
        }
    }, []);

    // Render
    return (
        <NavigationContainer theme={customTheme}>
            <BookProvider>{renderView()}</BookProvider>
        </NavigationContainer>
    );
}

export default Navigation;
