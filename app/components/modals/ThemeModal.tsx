import useTheme from '../../hooks/useTheme';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { MoonIcon, SunIcon } from 'react-native-heroicons/outline';
import BaseText from '../commons/BaseText';
import Scaffold from '../commons/Scaffold';
import { useCallback, useMemo } from 'react';

function ThemeModal() {
    const theme = useTheme();

    // Memos
    const primaryColor = useMemo<string>(() => theme.palette.primary, [theme]);
    const baseColor = useMemo<string>(() => theme.palette.onBackground, [theme]);

    const sunStyle = useMemo<ViewStyle>(
        () => ({
            ...styles.themeContainer,
            backgroundColor: theme.dark ? undefined : theme.palette.primaryContainer
        }),
        [theme.dark]
    );

    const moonStyle = useMemo<ViewStyle>(
        () => ({
            ...styles.themeContainer,
            backgroundColor: theme.dark ? theme.palette.primaryContainer : undefined
        }),
        [theme.dark]
    );

    // Callbacks
    const setDark = useCallback(() => theme.changeScheme('dark'), [theme]);
    const setLight = useCallback(() => theme.changeScheme('light'), [theme]);

    return (
        <Scaffold>
            <View style={styles.row}>
                <TouchableOpacity style={sunStyle} onPress={setLight}>
                    <SunIcon color={primaryColor} size={64} />
                    <BaseText
                        variant={'body'}
                        size={'large'}
                        color={baseColor}
                        textTransform={'capitalize'}>
                        more:light
                    </BaseText>
                </TouchableOpacity>
                <TouchableOpacity style={moonStyle} onPress={setDark}>
                    <MoonIcon color={primaryColor} size={64} />
                    <BaseText
                        variant={'body'}
                        size={'large'}
                        color={baseColor}
                        textTransform={'capitalize'}>
                        more:dark
                    </BaseText>
                </TouchableOpacity>
            </View>
        </Scaffold>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '100%'
    },
    themeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        padding: 10,
        borderRadius: 12
    }
});

export default ThemeModal;
