import { Pressable, StyleSheet } from 'react-native';
import { useCallback } from 'react';
import BaseText from './BaseText';

type MenuItemProps = {
    text: string;
    icon?: (props: any) => JSX.Element;
    onPress: () => void;
    closeModal?: () => void;
    color: string;
};
function MenuItem(props: MenuItemProps) {
    // Callbacks
    const handleOnPress = useCallback(() => {
        props.onPress();
        props.closeModal!();
    }, [props.onPress, props.closeModal]);

    // Render
    return (
        <>
            <Pressable onPress={handleOnPress} style={styles.body}>
                {props.icon && <props.icon size={20} color={props.color} />}
                <BaseText
                    variant={'label'}
                    size={'medium'}
                    color={props.color}
                    numberOfLines={1}
                    textTransform={'capitalize'}>
                    {props.text}
                </BaseText>
            </Pressable>
        </>
    );
}

const styles = StyleSheet.create({
    body: {
        padding: 10,
        flexDirection: 'row',
        gap: 10
    }
});

export default MenuItem;
