// React
import {
    forwardRef,
    ReactNode,
    Ref,
    useCallback,
    useImperativeHandle,
    useMemo,
    useState
} from 'react';
import { Modal, StyleSheet, View, ViewStyle } from 'react-native';

// Components
import BottomSheetBackdrop from './BottomSheetBackdrop';

// Others
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { ModalMethods } from '../../types/structs';
import useTheme from '../../hooks/useTheme';

export type BottomSheetMethods = ModalMethods;

export type BottomSheetRef = Ref<BottomSheetMethods>;

type BottomSheetModalProps = {
    snapPoint?: string;
    title: string;
    children: ReactNode | ReactNode[];
    onDismiss?: () => void;
};

function BottomSheetModal(props: BottomSheetModalProps, forwardedRef: BottomSheetRef) {
    // Hooks
    const translateY = useSharedValue(1000);

    const bodyAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: translateY.value
                }
            ]
        };
    });

    const theme = useTheme();

    // States
    const [visible, setVisible] = useState(false);

    // Memos
    const gestureStyle = useMemo<ViewStyle>(() => {
        return {
            ...styles.gesture,
            height: props.snapPoint ? props.snapPoint : '100%'
        };
    }, [props.snapPoint, styles.gesture]);

    const bodyStyle = useMemo(
        () => [styles.activeSection, bodyAnimatedStyle],
        [styles.activeSection, bodyAnimatedStyle]
    );

    const handleContainerStyle = useMemo(
        () => ({
            ...styles.handleContainer,
            backgroundColor: theme.palette.surfaceContainer
        }),
        [theme]
    );

    const handleStyle = useMemo(
        () => ({
            ...styles.handle,
            backgroundColor: theme.palette.secondary
        }),
        [theme]
    );

    const dragGesture = useMemo(
        () =>
            Gesture.Pan()
                .onUpdate(e => {
                    if (e.translationY < 0) return;
                    else {
                        translateY.value = e.translationY;
                    }
                })
                .onEnd(e => {
                    if (e.translationY > 100) {
                        runOnJS(closeModalWorklet)();
                        translateY.value = withTiming(1000, { duration: 200 });
                    } else {
                        translateY.value = withTiming(0, { duration: 100 });
                    }
                }),
        []
    );

    // Callbacks
    const closeModal = useCallback(() => {
        setTimeout(() => setVisible(false), 200);
        translateY.value = withTiming(1000, { duration: 200 });
        props.onDismiss?.();
    }, []);

    // Methods
    function closeModalWorklet() {
        setTimeout(() => setVisible(false), 200);
    }

    // Imperative handles
    useImperativeHandle(
        forwardedRef,
        () => {
            return {
                present() {
                    setVisible(true);
                    translateY.value = withTiming(0, { duration: 200 });
                },
                close() {
                    closeModal();
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
            animationType='none'
            onRequestClose={closeModal}
            hardwareAccelerated={true}>
            <BottomSheetBackdrop onPress={closeModal} animatedY={translateY} />
            <GestureHandlerRootView style={gestureStyle}>
                <GestureDetector gesture={dragGesture}>
                    <Animated.View style={bodyStyle}>
                        <View style={handleContainerStyle}>
                            <View style={handleStyle} />
                        </View>
                        <View style={styles.contentContainer}>{props.children}</View>
                    </Animated.View>
                </GestureDetector>
            </GestureHandlerRootView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    gesture: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 99
    },
    activeSection: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        elevation: 8
    },
    contentContainer: {
        overflow: 'hidden',
        flexGrow: 1
    },
    handleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    handle: {
        height: 10,
        width: 50,
        borderRadius: 20
    }
});

export default forwardRef(BottomSheetModal);
