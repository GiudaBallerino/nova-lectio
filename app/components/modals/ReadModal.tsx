import { useCallback, useEffect, useMemo, useState } from 'react';
import Scaffold from '../commons/Scaffold';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';
import { MinusIcon, PlusIcon } from 'react-native-heroicons/outline';
import * as React from 'react';
import useTheme from '../../hooks/useTheme';
import BaseText from '../commons/BaseText';

type ReadModalProps = {
    currentPages: number | undefined;
    totalPages: number | undefined;
    setPages: (page: number) => void;
};

const options = [1, 5, 10, 100, Number.MAX_SAFE_INTEGER];
function ReadModal(props: ReadModalProps) {
    // Hooks
    const theme = useTheme();

    // States
    const [selected, setSelected] = useState<number>(0);
    const [count, setCount] = useState<number>(0);

    // Memos
    const optionTextColor = useMemo<string>(() => theme.palette.onPrimaryContainer, [theme]);
    const selectedOptionTextColor = useMemo<string>(() => theme.palette.onPrimary, [theme]);
    const textColor = useMemo<string>(() => theme.palette.onBackground, [theme]);

    const optionContainerStyle = useMemo<ViewStyle>(
        () => ({
            ...styles.optionsContainer,
            backgroundColor: theme.palette.primaryContainer
        }),
        [theme]
    );

    const optionStyle = useMemo<ViewStyle>(
        () => ({
            ...styles.option
        }),
        [theme]
    );
    const selectedOptionStyle = useMemo<ViewStyle>(
        () => ({
            ...styles.option,
            backgroundColor: theme.palette.primary
        }),
        [theme]
    );

    // Methods
    const handelOnMinus = useCallback(() => setCount(prev => prev - options[selected]), [selected]);

    const handleOnPlus = useCallback(() => setCount(prev => prev + options[selected]), [selected]);

    const updatePages = useCallback(() => {
        props.setPages(Math.max(0, Math.min(props.currentPages! + count, props.totalPages!)));
        setCount(0);
    }, [props.setPages, props.currentPages, count]);

    // Effects
    useEffect(() => {
        const timer = setTimeout(() => updatePages(), 500);

        return () => {
            clearTimeout(timer);
        };
    }, [count]);

    // Render
    return (
        <Scaffold>
            <View style={styles.body}>
                <View style={optionContainerStyle}>
                    {options.map((o, index) => (
                        <TouchableOpacity
                            key={index.toString()}
                            style={index === selected ? selectedOptionStyle : optionStyle}
                            onPress={() => setSelected(index)}>
                            <BaseText
                                key={index}
                                variant={'title'}
                                size={'medium'}
                                color={
                                    index === selected ? selectedOptionTextColor : optionTextColor
                                }
                                textTransform={'capitalize'}>
                                {o === Number.MAX_SAFE_INTEGER ? 'general:all' : o}
                            </BaseText>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.actionsContainer}>
                    {props.currentPages !== undefined && props.totalPages !== undefined ? (
                        <>
                            <MinusIcon onPress={handelOnMinus} color={textColor} />
                            <BaseText variant={'headline'} size={'small'} color={textColor}>
                                {Math.max(
                                    0,
                                    Math.min(props.currentPages! + count, props.totalPages!)
                                )}{' '}
                                <BaseText variant={'body'} size={'large'} color={textColor}>
                                    /{props.totalPages}
                                </BaseText>
                            </BaseText>
                            <PlusIcon onPress={handleOnPlus} color={textColor} />
                        </>
                    ) : (
                        <ActivityIndicator size={25} color={theme.palette.secondary} />
                    )}
                </View>
            </View>
        </Scaffold>
    );
}

const styles = StyleSheet.create({
    body: {
        gap: 30
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'gainsboro',
        borderRadius: 30
    },
    option: {
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
        paddingHorizontal: 80,
        paddingVertical: 10
    }
});

export default ReadModal;
