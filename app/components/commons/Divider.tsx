import { View, ViewStyle } from 'react-native';
import { useMemo } from 'react';

type DividerProps = {
    color: string;
    lineWidth: number;
};
function Divider(props: DividerProps) {
    const style = useMemo<ViewStyle>(
        () => ({
            backgroundColor: props.color,
            width: '100%',
            height: props.lineWidth
        }),
        [props.lineWidth, props.color]
    );

    return <View style={style} />;
}

export default Divider;
