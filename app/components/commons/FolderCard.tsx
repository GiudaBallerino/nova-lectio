import { useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { FolderIcon, PencilIcon, TrashIcon } from 'react-native-heroicons/outline';
import BaseText from './BaseText';
import useTheme from '../../hooks/useTheme';

type FolderCardProps = {
    folder: string;
    onEdit?: () => void;
    onDelete?: () => void;
};

function FolderCard(props: FolderCardProps) {
    // Hooks
    const theme = useTheme();

    // Memos
    const bodyStyle = useMemo<ViewStyle>(
        () => ({
            ...styles.row,
            ...styles.body,
            backgroundColor: theme.palette.secondary
        }),
        [theme]
    );

    const contentColor = useMemo<string>(() => theme.palette.onSecondary, [theme]);

    // Render
    return (
        <View style={bodyStyle}>
            <View style={[styles.row, styles.contentContainer]}>
                <FolderIcon color={contentColor} />
                <BaseText variant={'label'} size={'medium'} color={contentColor}>
                    {props.folder}
                </BaseText>
            </View>
            <View style={[styles.row, styles.contentContainer]}>
                {props.onDelete && <TrashIcon color={contentColor} onPress={props.onDelete} />}
                <PencilIcon color={contentColor} onPress={props.onEdit} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    body: {
        padding: 10,
        borderRadius: 10,
        justifyContent: 'space-between'
    },
    contentContainer: {
        gap: 20
    }
});

export default FolderCard;
