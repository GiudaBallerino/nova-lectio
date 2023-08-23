import { useContext, useMemo } from 'react';
import { BookData } from '../../types/entities';
import { BookOpenIcon } from 'react-native-heroicons/outline';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import * as React from 'react';
import { BookContext } from '../providers/BookProvider';

type ReadButtonProps = {
    book: BookData;
    color?: string;
    iconColor?: string;
};
function ReadButton(props: ReadButtonProps) {
    // Hooks
    const { open } = useContext(BookContext);

    // Memos
    const containerStyle = useMemo<ViewStyle>(
        () => ({ ...styles.container, backgroundColor: props.color }),
        [props.color]
    );

    return (
        <TouchableOpacity style={containerStyle} onPress={() => open(props.book)}>
            <BookOpenIcon color={props.iconColor} size={30} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        gap: 5,
        alignItems: 'center',
        marginTop: 30,
        borderRadius: 10
    }
});

export default ReadButton;
