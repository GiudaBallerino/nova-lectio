import { Book, ColorPalette, ImageLinks, TextColorPalette } from '../types/entities';
import { SearchVolumesResponse } from '../types/responses';
import {
    AndroidImageColors,
    ImageColorsResult
} from 'react-native-image-colors/lib/typescript/types';

class ColorFactory {
    static getLuminanceFromHexColor(hex: string): number {
        const color = hex.charAt(0) === '#' ? hex.substring(1, 7) : hex;

        const backgroundColors = [
            parseInt(color.substring(0, 2), 16) / 255,
            parseInt(color.substring(2, 4), 16) / 255,
            parseInt(color.substring(4, 6), 16) / 255
        ];

        const c = backgroundColors.map(col => {
            if (col <= 0.03928) {
                return col / 12.92;
            }
            return Math.pow((col + 0.055) / 1.055, 2.4);
        });

        return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    }

    static getBestColorFromLuminance(luminance: number): string {
        return luminance > 0.179 ? '#000' : '#fff';
    }
    static fromImageColorResultToColorPalette(result: AndroidImageColors): ColorPalette {
        return {
            ...result,
            ...{
                onDominant: this.getBestColorFromLuminance(
                    this.getLuminanceFromHexColor(result.dominant!)
                ),
                onAverage: this.getBestColorFromLuminance(
                    this.getLuminanceFromHexColor(result.average!)
                ),
                onVibrant: this.getBestColorFromLuminance(
                    this.getLuminanceFromHexColor(result.vibrant!)
                ),
                onDarkVibrant: this.getBestColorFromLuminance(
                    this.getLuminanceFromHexColor(result.darkVibrant!)
                ),
                onLightVibrant: this.getBestColorFromLuminance(
                    this.getLuminanceFromHexColor(result.lightVibrant!)
                ),
                onDarkMuted: this.getBestColorFromLuminance(
                    this.getLuminanceFromHexColor(result.darkMuted!)
                ),
                onLightMuted: this.getBestColorFromLuminance(
                    this.getLuminanceFromHexColor(result.lightMuted!)
                ),
                onMuted: this.getBestColorFromLuminance(
                    this.getLuminanceFromHexColor(result.muted!)
                )
            }
        };
    }
}

export default ColorFactory;
