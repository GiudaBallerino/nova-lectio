import { AndroidImageColors } from 'react-native-image-colors/lib/typescript/types';

export type TextColorPalette = {
    onDominant?: string;
    onAverage?: string;
    onVibrant?: string;
    onDarkVibrant?: string;
    onLightVibrant?: string;
    onDarkMuted?: string;
    onLightMuted?: string;
    onMuted?: string;
};
export type ColorPalette = AndroidImageColors & TextColorPalette;

export type ImageLinks = {
    smallThumbnail?: string;
    thumbnail?: string;
    small?: string;
    medium?: string;
    large?: string;
    extraLarge?: string;
};

export type VolumeInfo = {
    title?: string;
    subtitle?: string;
    authors?: string[];
    description?: string;
    pageCount?: number;
    categories?: string[];
    imageLinks?: ImageLinks;
    language?: string;
    averageRating?: number;
};

export type Book = {
    id: string;
    volumeInfo: VolumeInfo;
};

export type BookData = {
    book: Book;
    folders: string[];
    currentPage: number;
    favorite: boolean;
    removed: boolean;
};

export type BestSeller = {
    rank: number;
    rankLastWeek: number;
    weeksOnList: number;
    asterisk: number;
    dagger: number;
    primaryIsbn10: string;
    primaryIsbn13: string;
    publisher: string;
    description: string;
    price: string;
    title: string;
    author: string;
    contributor: string;
    contributorNote: string;
    bookImage: string;
    bookImageWidth: number;
    bookImageHeight: number;
    amazonProductUrl: string;
    ageGroup: string;
    bookReviewLink: string;
    firstChapterLink: string;
    sundayReviewLink: string;
    articleChapterLink: string;
    isbns: Isbn[];
    buyLinks: BuyLink[];
    bookUri: string;
};

export type Isbn = {
    isbn10: string;
    isbn13: string;
};

export type BuyLink = {
    name: string;
    url: string;
};
