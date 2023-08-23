import React, { useCallback, useMemo, useRef, useState } from 'react';
import Scaffold from '../../components/commons/Scaffold';
import { FlatList, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import useAppSelector from '../../hooks/useAppSelector';
import { PlusIcon } from 'react-native-heroicons/outline';
import FolderCard from '../../components/commons/FolderCard';
import BaseText from '../../components/commons/BaseText';
import FolderModal from '../../components/modals/FolderModal';
import useAppDispatch from '../../hooks/useAppDispath';
import { addFolder, deleteFolder } from '../../store/slices/bookshelfSlice';
import CustomModal, { CustomModalMethods } from '../../components/custom/CustomModal';
import useTheme from '../../hooks/useTheme';

function FoldersScreen() {
    //Hooks
    const dispatch = useAppDispatch();
    const theme = useTheme();

    // Global States
    const folders = useAppSelector(store => store.bookshelf.folders);

    // References
    const folderRef = useRef<CustomModalMethods>(null);

    // States
    const [edit, setEdit] = useState<string>();

    // Memos
    const buttonStyle = useMemo<ViewStyle>(
        () => ({ ...styles.button, backgroundColor: theme.palette.primary }),
        [theme]
    );
    const buttonContentColor = useMemo<string>(() => theme.palette.onPrimary, [theme]);

    const title = useMemo(() => (edit ? 'folders:edit' : 'folders:new'), [edit]);

    const DefaultFolder = useMemo(
        () => <FolderCard folder='Default' onEdit={() => handlePresentModal('Default')} />,
        []
    );
    // Callbacks
    const handlePresentModal = useCallback(
        (initialValue?: string) => {
            setEdit(initialValue);
            folderRef.current?.present();
        },
        [folderRef.current]
    );
    const handleOnDelete = useCallback((value: string) => dispatch(deleteFolder(value)), []);

    const handleOnDone = useCallback(
        (value: string) => {
            dispatch(addFolder({ initial: edit, new: value }));
            folderRef.current?.close();
        },
        [edit]
    );

    const handleOnClose = useCallback(() => {
        folderRef.current?.close();
    }, [edit]);

    const renderFolder = useCallback(
        ({ item }: { item: string }) => (
            <FolderCard
                folder={item}
                onEdit={() => handlePresentModal(item)}
                onDelete={
                    folders.length !== 1 || item !== 'Default'
                        ? () => handleOnDelete(item)
                        : undefined
                }
            />
        ),
        [handleOnDelete, handlePresentModal, folders]
    );

    return (
        <Scaffold>
            <CustomModal ref={folderRef} title={title}>
                <FolderModal onDone={handleOnDone} onClose={handleOnClose} initialValue={edit} />
            </CustomModal>
            <FlatList
                data={folders}
                renderItem={renderFolder}
                keyExtractor={item => item}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListEmptyComponent={DefaultFolder}
            />
            <TouchableOpacity style={buttonStyle} onPress={() => handlePresentModal('')}>
                <PlusIcon color={buttonContentColor} />
                <BaseText
                    variant={'label'}
                    size={'large'}
                    color={buttonContentColor}
                    textTransform={'capitalize'}>
                    general:add
                </BaseText>
            </TouchableOpacity>
        </Scaffold>
    );
}

const styles = StyleSheet.create({
    button: {
        alignSelf: 'flex-end',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    separator: {
        height: 5
    }
});

export default FoldersScreen;
