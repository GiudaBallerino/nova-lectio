import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';

import MultiSelectItem from '../commons/MultiSelectItem';
import BaseText from '../commons/BaseText';
import useTheme from '../../hooks/useTheme';

type MultiSelectModalProps<T> = {
    items: T[];
    getItemsLabel: (item: T) => string;
    isSelected?: (item: T) => boolean;
    onDone: (items: T[]) => void;
    onEdit: () => void;
    onClose: () => void;
};

const { width: layoutWidth, height: layoutHeight } = Dimensions.get('window');
function MultiSelectModal<T>(props: MultiSelectModalProps<T>) {
    // Hooks
    const theme = useTheme();

    const [selectedItems, setSelectedItems] = useState<T[]>([]);

    // Memos
    const primaryButton = useMemo(() => theme.palette.primary, [theme]);
    const secondaryButton = useMemo(() => theme.palette.secondary, [theme]);

    // Callbacks
    const closeModal = useCallback(() => {
        props.onClose();
    }, []);

    const handleOnSelect = useCallback(
        (item: T) =>
            setSelectedItems(prev =>
                prev.includes(item) ? prev.filter(i => i !== item) : [...prev, ...[item]]
            ),
        []
    );

    const handleOnDone = useCallback(() => {
        props.onDone(selectedItems);
        closeModal();
    }, [closeModal, props.onDone, selectedItems]);

    const handleOnEdit = useCallback(() => {
        props.onEdit();
        closeModal();
    }, [closeModal, props.onEdit]);

    const renderMenuItem = useCallback(
        (item: T, index: number) => (
            <MultiSelectItem
                key={index.toString()}
                title={props.getItemsLabel(item)}
                onPress={() => handleOnSelect(item)}
                selected={selectedItems.includes(item)}
            />
        ),
        [props.items, selectedItems]
    );

    // Effect
    useEffect(() => {
        if (props.isSelected !== undefined) {
            setSelectedItems(props.items.filter(props.isSelected));
        }
    }, [props.isSelected]);

    return (
        <>
            {props.items.map(renderMenuItem)}
            <View style={styles.actions}>
                <TouchableOpacity onPress={handleOnEdit}>
                    <BaseText
                        variant={'body'}
                        size={'large'}
                        color={secondaryButton}
                        textTransform={'capitalize'}>
                        general:edit
                    </BaseText>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleOnDone}>
                    <BaseText
                        variant={'body'}
                        size={'large'}
                        color={primaryButton}
                        textTransform={'capitalize'}>
                        general:add
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
    }
});

export default MultiSelectModal;
