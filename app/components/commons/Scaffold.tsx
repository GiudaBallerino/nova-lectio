import { ReactNode, useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import useTheme from '../../hooks/useTheme';

type ScaffoldProps = {
    children: ReactNode;
    style?: ViewStyle;
};
function Scaffold(props: ScaffoldProps) {
    // Hooks
    const theme = useTheme();

    // Memos
    const mainStyle = useMemo<ViewStyle>(
        () => ({
            ...styles.main,
            ...props.style,
            backgroundColor: theme.palette.background
        }),
        [theme]
    );

    // Render
    return <View style={mainStyle}>{props.children}</View>;
}
const styles = StyleSheet.create({
    main: { flex: 1, padding: 20, gap: 10 }
});
export default Scaffold;
