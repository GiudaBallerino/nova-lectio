import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import BaseText from './BaseText';
import useTheme from '../../hooks/useTheme';

type MultiSelectItemProps = {
    title: string;
    onPress: (value: boolean) => void;
    selected: boolean;
    disabled?: boolean;
};

function MultiSelectItem(props: MultiSelectItemProps) {
    // Hooks
    const theme = useTheme();

    // Render
    return (
        <TouchableOpacity
            style={styles.body}
            onPress={() => props.onPress(!props.selected)}
            disabled={props.disabled}>
            <CheckBox
                disabled={props.disabled}
                value={props.selected}
                onValueChange={props.onPress}
            />
            <BaseText
                variant={'label'}
                size={'large'}
                color={theme.palette.onBackground}
                numberOfLines={1}>
                {props.title}
            </BaseText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    body: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
});

export default MultiSelectItem;
