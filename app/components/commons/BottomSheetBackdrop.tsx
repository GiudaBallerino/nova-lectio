// React
import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

// Others
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

type BottomSheetModalBackdropProps = {
    animatedY: Animated.SharedValue<number>;
    onPress: () => void;
};

function BottomSheetModalBackdrop({ animatedY, onPress }: BottomSheetModalBackdropProps) {
    // Hooks
    const containerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(animatedY.value, [1000, 0], [0, 1], Extrapolate.CLAMP)
    }));

    // Memos
    const containerStyle = useMemo(
        () => [
            styles.container,
            {
                backgroundColor: 'rgba(0, 0, 0, 0.85)'
            },
            containerAnimatedStyle
        ],
        [styles.container, containerAnimatedStyle]
    );

    // Render
    return (
        <Animated.View style={containerStyle}>
            <TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.modalWrapper} />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 10,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    modalWrapper: {
        width: '100%',
        height: '100%'
    }
});

export default BottomSheetModalBackdrop;
