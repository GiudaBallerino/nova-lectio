import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';
import { ViewStyle } from 'react-native';
import BookshelfScreen from '../screens/auth/BookshelfScreen';
import useAppSelector from '../hooks/useAppSelector';
import { useMemo } from 'react';
import { TabStackParamList } from '../types/navigation';
import useTheme from '../hooks/useTheme';

const Tab = createMaterialTopTabNavigator<TabStackParamList>();

function BookshelfView() {
    // Hooks
    const theme = useTheme();

    // Global States
    const folders = useAppSelector(store => store.bookshelf.folders);
    const books = useAppSelector(store =>
        store.bookshelf.bookshelf.filter(b => b.folders.includes('Default'))
    );

    //Memos
    const indicatorStyle = useMemo<ViewStyle>(
        () => ({ backgroundColor: theme.palette.primary }),
        [theme]
    );

    // Memos
    const tabs = useMemo(() => {
        const list = folders.map(t => (
            <Tab.Screen
                key={t}
                name={t}
                component={BookshelfScreen}
                initialParams={{ folder: t }}
            />
        ));
        if (!list.length || books.length)
            return [
                <Tab.Screen
                    key='Default'
                    name='Default'
                    component={BookshelfScreen}
                    initialParams={{ folder: 'Default' }}
                />
            ].concat(list);
        else return list;
    }, [folders, books]);
    //

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarScrollEnabled: true,
                tabBarIndicatorStyle: indicatorStyle,
                tabBarItemStyle: { width: 'auto' },
                tabBarGap: 5
            }}>
            {tabs}
        </Tab.Navigator>
    );
}

export default BookshelfView;
