import { ReactNode, useMemo } from 'react';
import { Text, TextStyle } from 'react-native';
import { Theme } from '../../configs/constants';
import { Variant, VariantSize, VariantStyle } from '../../types/structs';
import { useTranslation } from 'react-i18next';

export type BaseTextProps = {
    variant: keyof Variant;
    size: keyof VariantSize;
    color: string;
    children: ReactNode;
    numberOfLines?: number;
    textTransform?: 'uppercase' | 'none' | 'capitalize' | 'lowercase';
};
function BaseText(props: BaseTextProps) {
    const { t } = useTranslation();

    // Memos
    const children = useMemo(() => {
        if (typeof props.children === 'string') {
            return t(props.children);
        } else {
            return props.children;
        }
    }, [props.children, t]);

    const textStyle = useMemo<TextStyle>(() => {
        const style = Theme.styles[props.variant][props.size] as VariantStyle;
        return {
            fontFamily: style.fontFamilyStyle,
            fontSize: style.fontSize,
            fontWeight: style.fontWeight,
            lineHeight: style.lineHeight,
            letterSpacing: style.letterSpacing,
            color: props.color,
            textTransform: props.textTransform
        };
    }, [props.size, props.variant, props.color, props.textTransform]);

    return (
        <Text style={textStyle} numberOfLines={props.numberOfLines}>
            {children}
        </Text>
    );
}

export default BaseText;
