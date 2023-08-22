import React, {
    useState,
    useEffect,
    useRef,
    useMemo,
    ReactNode,
    ReactElement,
    useCallback
} from 'react';
import {
    Pressable,
    StyleSheet,
    Platform,
    Dimensions,
    TouchableOpacity,
    StatusBar,
    Animated,
    ViewStyle,
    View,
    FlatList,
    Text
} from 'react-native';
import { Portal } from '@gorhom/portal';
import useKeyboardHeight from '../../hooks/useKeyboardHeight';
import useTheme from '../../hooks/useTheme';
import BaseText from '../commons/BaseText';

type MenuProps = {
    title: string;
    icon: ReactNode;
    children: ReactElement[] | ReactElement;
};

const { width: layoutWidth, height: layoutHeight } = Dimensions.get('window');

const Menu = (props: MenuProps) => {
    const children: ReactElement[] = Array.isArray(props.children)
        ? props.children
        : [props.children];
    // Hooks
    const { keyboardHeight } = useKeyboardHeight();
    const theme = useTheme();

    // States
    const [menuVisible, setMenuVisible] = useState(false);

    const [triggerDimensions, setTriggerDimensions] = useState({
        top: 0,
        left: 0,
        width: 0,
        height: 0
    });
    const [modalDimensions, setModalDimensions] = useState({
        width: 0,
        height: 0
    });

    // References
    const triggerWrapperRef = useRef<View>(null);
    const itemsWrapperRef = useRef<View>(null);

    // Memos
    const { top, left } = useMemo(() => {
        let left = 0;
        let top = 0;

        left = triggerDimensions.left - modalDimensions.width + triggerDimensions.width;
        // if the popup is outside the screen from the left
        if (triggerDimensions.left - modalDimensions.width < 0) left = triggerDimensions.left;

        const initialTriggerTop =
            triggerDimensions.top + triggerDimensions.height + StatusBar.currentHeight!;

        top =
            initialTriggerTop + modalDimensions.height > layoutHeight - keyboardHeight
                ? initialTriggerTop - triggerDimensions.height - modalDimensions.height
                : initialTriggerTop;

        return { top, left };
    }, [modalDimensions, triggerDimensions, keyboardHeight]);

    const activeSectionStyle = useMemo<ViewStyle>(
        () => ({
            ...styles.activeSection,
            opacity: modalDimensions.width !== 0 && triggerDimensions.left !== 0 ? 1 : 0,
            backgroundColor: theme.palette.background
        }),
        [modalDimensions, triggerDimensions]
    );

    const titleColor = useMemo(() => theme.palette.onBackground, [theme]);

    // Callbacks
    const calculateDimensions = useCallback(() => {
        triggerWrapperRef?.current?.measureInWindow((x, y, width, height) => {
            setTriggerDimensions({
                top: Math.max(y, 0),
                left: x,
                width,
                height
            });
        });

        setTimeout(() => {
            itemsWrapperRef?.current?.measureInWindow((x, y, width, height) => {
                setModalDimensions({ width, height });
            });
        }, 100);
    }, [triggerWrapperRef, itemsWrapperRef]);

    const closeModal = useCallback(() => {
        setMenuVisible(false);
        setModalDimensions({ width: 0, height: 0 });
        setTriggerDimensions({ top: 0, left: 0, width: 0, height: 0 });
    }, []);

    const renderMenuItem = useCallback(
        (item: ReactElement, index: number) => (
            <View key={index.toString()}>
                {React.cloneElement(item, {
                    closeModal
                })}
                {index < children.length - 1 && <View style={styles.separator} />}
            </View>
        ),
        [props.children]
    );

    // Effects
    useEffect(() => {
        if (menuVisible) {
            if (triggerWrapperRef?.current) calculateDimensions();
        }
    }, [menuVisible, itemsWrapperRef, setModalDimensions]);

    return (
        <>
            <Pressable
                onPress={() => {
                    setMenuVisible(true);
                }}
                ref={triggerWrapperRef}>
                {props.icon}
            </Pressable>
            <Portal hostName='menu'>
                {menuVisible && (
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={closeModal}
                        style={styles.modalWrapper}>
                        <Animated.View
                            style={[activeSectionStyle, { left, top }]}
                            collapsable={false}
                            ref={itemsWrapperRef}>
                            <View style={styles.titleContainer}>
                                <BaseText
                                    variant={'title'}
                                    size={'medium'}
                                    color={titleColor}
                                    textTransform={'uppercase'}>
                                    {props.title}
                                </BaseText>
                            </View>
                            {children.map(renderMenuItem)}
                        </Animated.View>
                    </TouchableOpacity>
                )}
            </Portal>
        </>
    );
};

const styles = StyleSheet.create({
    modalWrapper: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 10
    },

    button: {
        width: 'auto',
        alignSelf: 'center'
    },
    activeSection: {
        maxWidth: layoutWidth * 0.7,
        alignSelf: 'flex-start',
        borderRadius: 10,
        elevation: 8,
        zIndex: 99
    },
    separator: {
        borderBottomWidth: 0.2
    },
    titleContainer: { borderBottomWidth: 1, padding: 10, alignItems: 'center' },
    title: { color: 'black' }
});

export default Menu;
