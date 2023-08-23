import { StyleSheet, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import { cloneElement, useMemo } from 'react';
import useTheme from '../../hooks/useTheme';

type SearchBarProps = {
    actions: JSX.Element[];
} & TextInputProps;
function SearchBar(props: SearchBarProps) {
    const { actions, ...rest } = props;

    //Hooks
    const theme = useTheme();

    // Memos
    const editable = useMemo<boolean>(() => rest.editable ?? true, [props]);

    const containerStyle = useMemo<ViewStyle>(
        () => ({
            ...styles.container,
            backgroundColor: theme.palette.secondary
        }),
        [theme]
    );

    return (
        <View style={containerStyle}>
            <TextInput {...rest} style={styles.bar} />
            <>
                {actions.map((item, index) =>
                    cloneElement(item, { key: index.toString(), disabled: !editable })
                )}
            </>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderRadius: 30,
        height: 40
    },
    bar: {
        flexGrow: 1
    }
});

export default SearchBar;
