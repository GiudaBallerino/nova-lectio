import { StyleSheet, View, ViewStyle } from 'react-native';
import * as React from 'react';
import { ReactElement, useMemo } from 'react';
import BaseText from './BaseText';
import { StarIcon } from 'react-native-heroicons/outline';
type ChipProps = {
    text: ReactElement<typeof BaseText>;
    icon?: ReactElement<typeof StarIcon>;
    color: string;
};
function Chip({ text, icon, color }: ChipProps) {
    const containerStyle = useMemo<ViewStyle>(
        () => ({ ...styles.container, backgroundColor: color }),
        [color]
    );

    return (
        <View style={{ ...containerStyle, ...styles.reviewContainer }}>
            {text}
            {icon}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        gap: 5,
        alignItems: 'center'
    },
    reviewContainer: {
        height: 30,
        width: 65,
        gap: 5,
        flexDirection: 'row'
    },
    tags: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    }
});

export default Chip;
