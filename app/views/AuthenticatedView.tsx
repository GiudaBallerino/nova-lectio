import { RootStackParamList } from '../types/navigation';
import BookScreen from '../screens/auth/BookScreen';
import { createStackNavigator } from '@react-navigation/stack';
import TabView from './TabView';
import SearchScreen from '../screens/auth/SearchScreen';
import FoldersScreen from '../screens/auth/FoldersScreen';
import StatsScreen from '../screens/auth/StatsScreen';

const Stack = createStackNavigator<RootStackParamList>();
function AuthenticatedView() {
    // Render
    return (
        <Stack.Navigator initialRouteName={'TabView'}>
            <Stack.Screen name='TabView' component={TabView} options={{ headerShown: false }} />
            <Stack.Screen
                name='Book'
                component={BookScreen}
                options={{
                    headerShown: false,
                    presentation: 'modal'
                }}
            />
            <Stack.Screen
                name='Search'
                component={SearchScreen}
                options={{
                    headerShown: false,
                    presentation: 'modal'
                }}
            />
            <Stack.Screen
                name='Folders'
                component={FoldersScreen}
                options={{
                    headerShown: false,
                    presentation: 'modal'
                }}
            />
            <Stack.Screen
                name='Stats'
                component={StatsScreen}
                options={{
                    headerShown: false,
                    presentation: 'modal'
                }}
            />
        </Stack.Navigator>
    );
}

export default AuthenticatedView;
