import React, { useMemo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import useTheme from '../../hooks/useTheme';
import BaseText from './BaseText';
import { BookOpenIcon } from 'react-native-heroicons/outline';
import Divider from './Divider';

type ReadedCardProps = {
    value: number;
};
function ReadedCard(props: ReadedCardProps) {
    // Hooks
    const theme = useTheme();

    // Memos
    const containerStyle = useMemo<ViewStyle>(
        () => ({ ...styles.container, backgroundColor: theme.palette.tertiaryContainer }),
        [theme]
    );

    const primaryColor = useMemo<string>(() => theme.palette.tertiary, [theme]);
    const baseColor = useMemo<string>(() => theme.palette.onBackground, [theme]);
    const dividerColor = useMemo<string>(() => theme.palette.outline, [theme]);

    //-- Render
    return (
        <View style={containerStyle}>
            <View style={styles.row}>
                <BookOpenIcon color={primaryColor} />
                <BaseText
                    variant={'headline'}
                    size={'small'}
                    color={baseColor}
                    textTransform='capitalize'>
                    stats:read
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
                        {props.value}
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

export default ReadedCard;
