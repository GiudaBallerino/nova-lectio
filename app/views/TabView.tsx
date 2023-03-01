// Navigations
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../types/navigation';

// Screens
import MoreScreen from '../screens/auth/MoreScreen';

// Icons
import { BookOpenIcon as SolidBookOpenIcon } from 'react-native-heroicons/solid';
import {
    BookOpenIcon as OutlineBookOpenIcon,
    MagnifyingGlassIcon as OutlineMagnifyingGlassIcon,
    EllipsisHorizontalIcon as OutlineEllipsisHorizontalIcon
} from 'react-native-heroicons/outline';
import GalleryScreen from '../screens/auth/GalleryScreen';
import BookshelfView from './BookshelfView';
import useAppSelector from '../hooks/useAppSelector';
import { Theme } from '../configs/constants';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator<RootStackParamList>();
function TabView() {
    // hooks
    const { t } = useTranslation();

    // Global State
    const scheme = useAppSelector(store => store.settings.colorScheme);

    // Memos
    const iconColor = useMemo<string>(() => Theme.schemes[scheme].primary, [scheme]);

    // Render
    return (
        <Tab.Navigator
            backBehavior={'none'}
            initialRouteName={'Bookshelf'}
            screenOptions={{
                tabBarStyle: {
                    height: 65
                },
                tabBarLabelStyle: {
                    fontSize: 14,
                    textTransform: 'capitalize'
                },
                headerShown: false
            }}>
            <Tab.Screen
                name={'Bookshelf'}
                component={BookshelfView}
                options={{
                    title: t('nav:bookshelf') || '',
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <SolidBookOpenIcon color={iconColor} />
                        ) : (
                            <OutlineBookOpenIcon color={iconColor} />
                        )
                }}
            />
            <Tab.Screen
                name={'Gallery'}
                component={GalleryScreen}
                options={{
                    title: t('nav:gallery') || '',
                    tabBarIcon: ({ focused }) => (
                        <OutlineMagnifyingGlassIcon
                            color={iconColor}
                            strokeWidth={focused ? 3 : 2}
                        />
                    )
                }}
            />
            <Tab.Screen
                name={'More'}
                component={MoreScreen}
                options={{
                    title: t('nav:more') || '',
                    tabBarIcon: ({ focused }) => (
                        <OutlineEllipsisHorizontalIcon
                            color={iconColor}
                            strokeWidth={focused ? 3 : 2}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

export default TabView;
