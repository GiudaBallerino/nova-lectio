import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import useTheme from '../../hooks/useTheme';
import BaseText from '../commons/BaseText';

type FolderModalProps = {
    onDone: (text: string) => void;
    onClose: () => void;
    initialValue?: string;
};

function FolderModal(props: FolderModalProps) {
    // Hooks
    const theme = useTheme();

    // States
    const [value, setValue] = useState<string | undefined>(props.initialValue);
    const [inputState, setInputState] = useState<'initial' | 'valid' | 'invalid'>('initial');

    // Memos
    const textInputStyle = useMemo<ViewStyle>(() => {
        switch (inputState) {
            case 'initial':
                return {
                    ...styles.textInput,
                    borderColor: theme.palette.outline
                };
            case 'valid':
                return {
                    ...styles.textInput,
                    borderColor: theme.palette.primary
                };
            case 'invalid':
                return {
                    ...styles.textInput,
                    borderColor: theme.palette.error
                };
        }
    }, [theme, inputState]);

    const textStyle = useMemo<TextStyle>(() => ({ color: theme.palette.onBackground }), [theme]);
    const primaryButton = useMemo(() => {
        switch (inputState) {
            case 'initial':
                return theme.palette.outline;
            case 'valid':
                return theme.palette.primary;
            case 'invalid':
                return theme.palette.outline;
        }
    }, [theme]);
    const secondaryButton = useMemo(() => theme.palette.secondary, [theme]);

    const primaryIsDisabled = useMemo<boolean>(() => {
        switch (inputState) {
            case 'initial':
                return true;
            case 'valid':
                return false;
            case 'invalid':
                return true;
        }
    }, [inputState]);

    // Callbacks
    const handleOnDone = useCallback(() => {
        props.onDone(value!);
    }, [props.onDone, value]);

    const handleOnClose = useCallback(() => {
        props.onClose();
    }, [props.onClose]);

    //Effects
    useEffect(() => {
        if (!value || !/\S/.test(value)) {
            setInputState('invalid');
        } else if (value === props.initialValue) {
            setInputState('initial');
        } else {
            setInputState('valid');
        }
    }, [inputState, value]);

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
                <TouchableOpacity onPress={handleOnDone} disabled={primaryIsDisabled}>
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
    },
    textInput: {
        borderWidth: 2,
        paddingLeft: 5,
        borderRadius: 10
    }
});

export default FolderModal;
