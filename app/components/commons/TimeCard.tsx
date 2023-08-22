import React, { useMemo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import useTheme from '../../hooks/useTheme';
import BaseText from './BaseText';
import { ClockIcon } from 'react-native-heroicons/outline';
import Divider from './Divider';

type TimeCardProps = {
    time: number;
};
function TimeCard(props: TimeCardProps) {
    // Hooks
    const theme = useTheme();

    // Memos
    const containerStyle = useMemo<ViewStyle>(
        () => ({ ...styles.container, backgroundColor: theme.palette.tertiaryContainer }),
        [theme]
    );

    const primaryColor = useMemo<string>(() => theme.palette.tertiary, [theme]);
    const onContainerColor = useMemo<string>(() => theme.palette.onTertiaryContainer, []);
    const baseColor = useMemo<string>(() => theme.palette.onBackground, [theme]);
    const dividerColor = useMemo<string>(() => theme.palette.outline, [theme]);

    const time = useMemo(
        () => ({
            month: Math.floor(Math.abs(props.time) / (86400000 * 30)),
            day: Math.floor(Math.abs(props.time) / 86400000) % 30,
            hour: Math.floor(Math.abs(props.time) / 3600000) % 24
        }),
        [props.time]
    );

    //-- Render
    return (
        <View style={containerStyle}>
            <View style={styles.row}>
                <ClockIcon color={primaryColor} />
                <BaseText
                    variant={'headline'}
                    size={'small'}
                    color={baseColor}
                    textTransform='capitalize'>
                    stats:time
                </BaseText>
            </View>
            <Divider color={dividerColor} lineWidth={0.5} />
            <View style={styles.statisticSection}>
                <View style={styles.content}>
                    <BaseText
                        variant={'headline'}
                        size={'small'}
                        color={baseColor}
                        textTransform='uppercase'>
                        {time.month}
                    </BaseText>
                    <BaseText
                        variant={'title'}
                        size={'medium'}
                        color={onContainerColor}
                        textTransform='uppercase'>
                        stats:month
                    </BaseText>
                </View>
                <View style={styles.content}>
                    <BaseText
                        variant={'headline'}
                        size={'small'}
                        color={baseColor}
                        textTransform='uppercase'>
                        {time.day}
                    </BaseText>
                    <BaseText
                        variant={'title'}
                        size={'medium'}
                        color={onContainerColor}
                        textTransform='uppercase'>
                        stats:day
                    </BaseText>
                </View>
                <View style={styles.content}>
                    <BaseText
                        variant={'headline'}
                        size={'small'}
                        color={baseColor}
                        textTransform='uppercase'>
                        {time.hour}
                    </BaseText>
                    <BaseText
                        variant={'title'}
                        size={'medium'}
                        color={onContainerColor}
                        textTransform='uppercase'>
                        stats:hour
                    </BaseText>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        gap: 10
    },
    statisticSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sectionTitle: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

export default TimeCard;
