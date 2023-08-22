import {
    ActivityIndicator,
    Dimensions,
    ImageBackground,
    ImageStyle,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';
import useGetColorPaletteFromImage from '../../hooks/useGetColorPaletteFromImage';
import { useMemo } from 'react';
import * as React from 'react';
import BaseText from './BaseText';
import useTheme from '../../hooks/useTheme';
import { EMPTY_COVER } from '../../configs/constants';

export type BookCardProps = {
    source?: string;
    pageCount?: number;
    currentPage?: number;
    authors: string[];
    title: string;
    type?: 'cover' | 'card' | 'oneLine';
    showPercent?: boolean;
    onPress?: () => void;
    onLongPress?: () => void;
    disabled?: boolean;
};
const width = Dimensions.get('window').width;

function BookCard(props: BookCardProps) {
    const type = props.type ?? 'card';
    const showPercent = props.showPercent ?? false;

    // Hooks
    const theme = useTheme();
    const { color, isLoading } = useGetColorPaletteFromImage(
        props.source ? props.source : EMPTY_COVER
    );

    //Memos
    const percent = useMemo<number>(
        () =>
            props.pageCount
                ? props.pageCount !== 0
                    ? (props.currentPage ?? 0) / props.pageCount
                    : 1
                : 1,

        [props.pageCount, props.currentPage]
    );

    const bodyStyle = useMemo<ViewStyle>(() => {
        switch (type) {
            case 'card':
                return { ...styles.cardBody, backgroundColor: color?.average };
            case 'cover':
                return { height: 160, width: 100, marginBottom: 80 };
            case 'oneLine':
                return { height: 80, flexDirection: 'row' };
        }
    }, [color]);

    const coverStyle = useMemo<ViewStyle>(() => {
        switch (type) {
            case 'card':
                return styles.coverContainer;
            case 'cover':
                return { ...styles.coverContainer, height: '100%' };
            case 'oneLine':
                return { width: '15%', height: '100%' };
        }
    }, []);

    const imageStyle = useMemo<ImageStyle>(() => {
        switch (type) {
            case 'card':
                return styles.cardCover;
            case 'cover':
                return {
                    ...styles.cardCover,
                    resizeMode: 'contain',
                    borderBottomLeftRadius: 12,
                    borderBottomRightRadius: 12
                };
            case 'oneLine':
                return {
                    ...styles.cardCover,
                    resizeMode: 'contain',
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                    borderBottomLeftRadius: 5,
                    borderBottomRightRadius: 5
                };
        }
    }, []);

    const detailStyle = useMemo<ViewStyle>(() => {
        switch (type) {
            case 'card':
                return styles.detailsContainer;
            case 'cover':
                return {
                    ...styles.detailsContainer,
                    padding: 0
                };
            case 'oneLine':
                return { ...styles.detailsContainer, height: '100%' };
        }
    }, []);

    const infoColor = useMemo<string>(() => {
        switch (type) {
            case 'card':
                return color?.onAverage ?? theme.palette.onBackground;
            case 'cover':
                return theme.palette.onBackground;
            case 'oneLine':
                return theme.palette.onBackground;
        }
    }, [color]);

    const percentContainerStyle = useMemo<ViewStyle>(
        () => ({ ...styles.percentContainer, backgroundColor: color?.lightVibrant }),
        [color]
    );

    const percentColor = useMemo<string>(
        () => color?.onLightVibrant || theme.palette.primary,
        [color, theme]
    );

    const activityIndicatorStyle = useMemo<ViewStyle>(
        () => ({
            backgroundColor: theme.palette.outline,
            opacity: 0.8,
            width: '100%',
            height: '100%',
            borderRadius: 12
        }),
        [theme]
    );

    // Render
    if (isLoading) return <></>;
    return (
        <TouchableOpacity
            onPress={props.onPress}
            activeOpacity={0.6}
            onLongPress={props.onLongPress}
            disabled={props.disabled}>
            <View style={bodyStyle}>
                <View style={coverStyle}>
                    <ImageBackground
                        style={styles.cardCoverContainer}
                        imageStyle={imageStyle}
                        source={props.source ? { uri: props.source } : EMPTY_COVER}>
                        {props.disabled && (
                            <ActivityIndicator
                                style={activityIndicatorStyle}
                                color={theme.palette.background}
                            />
                        )}
                    </ImageBackground>
                    {showPercent && (
                        <View style={percentContainerStyle}>
                            <BaseText variant='label' size={'medium'} color={percentColor}>
                                {(100 * percent).toFixed(0)}%
                            </BaseText>
                        </View>
                    )}
                </View>
                <View style={detailStyle}>
                    <BaseText variant='label' size={'medium'} color={infoColor} numberOfLines={1}>
                        {props.authors?.join(', ')}
                    </BaseText>
                    <BaseText variant='title' size={'medium'} color={infoColor} numberOfLines={2}>
                        {props.title}
                    </BaseText>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardBody: {
        height: width * 0.44,
        width: width * 0.44,
        borderRadius: 12
    },
    coverContainer: {
        width: '100%',
        height: '55%'
    },
    cardCoverContainer: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardCover: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12
    },
    percentContainer: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 30,
        borderRadius: 4,
        position: 'absolute',
        top: 4,
        left: 4
    },
    percent: {
        fontWeight: '600'
    },
    detailsContainer: {
        width: '100%',
        height: '45%',
        padding: 10,
        justifyContent: 'center'
    },
    author: {
        opacity: 0.4,
        fontSize: 14,
        fontWeight: '600',
        color: 'black'
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: 'black'
    }
});

export default BookCard;
