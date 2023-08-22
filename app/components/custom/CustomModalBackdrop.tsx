// React
import React, { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

type CustomModalBackdropProps = {
    children?: ReactNode | ReactNode[];
    onPress: () => void;
};

function CustomModalBackdrop({ children, onPress }: CustomModalBackdropProps) {
    // Render
    return (
        <TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.modalWrapper}>
            {children}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    modalWrapper: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.65)'
    }
});

export default CustomModalBackdrop;