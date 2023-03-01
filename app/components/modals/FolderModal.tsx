import React, { Ref, useCallback, useMemo, useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';
import useTheme from '../../hooks/useTheme';
import BaseText from '../commons/BaseText';

type FolderModalProps = {
    onDone: (text: string) => void;
    onClose: () => void;
    initialValue?: string;
};

const { width: layoutWidth, height: layoutHeight } = Dimensions.get('window');
function FolderModal(props: FolderModalProps) {
    // Hooks
    const theme = useTheme();

    // States
    const [value, setValue] = useState<string | undefined>(props.initialValue);

    // Memos
    const textInputStyle = useMemo<ViewStyle>(
        () => ({
            borderRadius: 10,
            borderColor: theme.palette.primary,
            borderWidth: 2,
            paddingLeft: 5
        }),
        [theme]
    );

    const textStyle = useMemo<TextStyle>(() => ({ color: theme.palette.onBackground }), [theme]);
    const primaryButton = useMemo(() => theme.palette.primary, [theme]);
    const secondaryButton = useMemo(() => theme.palette.secondary, [theme]);

    // Callbacks
    const handleOnDone = useCallback(() => {
        props.onDone(value!);
    }, [props.onDone, value]);

    const handleOnClose = useCallback(() => {
        props.onClose();
    }, [props.onClose]);

    return (
        <>
            <View style={textInputStyle}>
                <TextInput value={value} onChangeText={setValue} style={textStyle} />
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={handleOnClose}>
                    <BaseText
                        variant={'body'}
                        size={'large'}
                        color={secondaryButton}
                        textTransform={'capitalize'}>
                        general:back
                    </BaseText>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleOnDone}>
                    <BaseText
                        variant={'body'}
                        size={'large'}
                        color={primaryButton}
                        textTransform={'capitalize'}>
                        general:done
                    </BaseText>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15,
        paddingHorizontal: 10
    },
    button: {
        width: 'auto',
        alignSelf: 'center'
    },
    separator: {
        borderBottomWidth: 0.2
    },
    textButton: {
        fontWeight: '500'
    }
});

export default FolderModal;
