import React, {
    forwardRef,
    ReactNode,
    Ref,
    useCallback,
    useImperativeHandle,
    useMemo,
    useState
} from 'react';
import { Dimensions, Modal, StyleSheet, Text, View, ViewStyle } from 'react-native';
import CustomModalBackdrop from './CustomModalBackdrop';
import useTheme from '../../hooks/useTheme';
import BaseText from '../commons/BaseText';
import { Theme } from '../../configs/constants';

export type CustomModalMethods = {
    present: (data?: any) => void;
    close: () => void;
};

export type CustomModalRef = Ref<CustomModalMethods>;

type CustomModalProps = {
    snapPoint?: string;
    title: string;
    children: ReactNode | ReactNode[];
};

const { width: layoutWidth, height: layoutHeight } = Dimensions.get('window');
function CustomModal(props: CustomModalProps, forwardedRef: CustomModalRef) {
    // Hooks
    const theme = useTheme();

    // States
    const [visible, setVisible] = useState(false);

    // Memos
    const activeSectionStyle = useMemo<ViewStyle>(() => {
        return {
            ...styles.activeSection,
            opacity: visible ? 1 : 0,
            backgroundColor: theme.palette.background
        };
    }, [props.snapPoint, styles.activeSection, visible, theme]);

    const titleColor = useMemo(() => theme.palette.onBackground, [theme]);

    // Callbacks
    const closeModal = useCallback(() => {
        setVisible(false);
    }, []);

    // Imperative handles
    useImperativeHandle(
        forwardedRef,
        () => {
            return {
                present() {
                    setVisible(true);
                },
                close() {
                    setVisible(false);
                }
            };
        },
        [forwardedRef]
    );

    // Render
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType={'fade'}
            onRequestClose={closeModal}
            hardwareAccelerated={true}>
            <CustomModalBackdrop onPress={closeModal}>
                <View style={activeSectionStyle}>
                    <View style={styles.titleContainer}>
                        <BaseText
                            variant={'title'}
                            size={'large'}
                            color={titleColor}
                            textTransform={'capitalize'}>
                            {props.title}
                        </BaseText>
                    </View>
                    {props.children}
                </View>
            </CustomModalBackdrop>
        </Modal>
    );
}

const styles = StyleSheet.create({
    activeSection: {
        width: layoutWidth * 0.7,
        paddingHorizontal: 10,
        borderRadius: 10,
        elevation: 8,
        zIndex: 99,
        padding: 10
    },
    titleContainer: { padding: 10, alignItems: 'center', justifyContent: 'center' }
});

export default forwardRef(CustomModal);
