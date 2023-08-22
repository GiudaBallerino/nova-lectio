import { useEffect, useState } from 'react';
import ImageColors from 'react-native-image-colors';
import {AndroidImageColors} from "react-native-image-colors/lib/typescript/types";
import {ColorPalette} from "../types/entities";
import ColorFactory from "../factories/colorFactory";

type UseGetImageColorResult = {
    color?: ColorPalette;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
};
function useGetColorPaletteFromImage(source: string): UseGetImageColorResult {
    const [color, setColor] = useState<ColorPalette>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        ImageColors.getColors(source)
            .then((res)  => {
                setColor(ColorFactory.fromImageColorResultToColorPalette(res as AndroidImageColors))
                setIsSuccess(true);
            })
            .catch(e => setIsError(true))
            .finally(() => setIsLoading(false));
    }, [source]);

    return {
        color: color,
        isError: isError,
        isLoading: isLoading,
        isSuccess: isSuccess,
    };
}

export default useGetColorPaletteFromImage;
