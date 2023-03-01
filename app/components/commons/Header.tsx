import {} from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import BaseText from './BaseText';

type HeaderProps = {
    title: string;
    containerStyle?: ViewStyle;
    style?: TextStyle;
    icon?: (props: any) => JSX.Element;
    color: string;
};
function Header(props: HeaderProps) {
    // Render
    return (
        <View style={{ ...props.containerStyle, ...styles.sectionRow }}>
            <BaseText
                variant={'title'}
                size={'medium'}
                color={props.color}
                textTransform='uppercase'>
                {props.title}
            </BaseText>
            {props.icon && <props.icon />}
        </View>
    );
}

const styles = StyleSheet.create({
    sectionRow: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default Header;
