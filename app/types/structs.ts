import { ORDER_BY, PRINT_TYPE, QUERY_TYPE } from './enums';
import { Book, BookData } from './entities';

export type Tab = {
    name: string;
    books: BookData[];
};

export type VariantStyle = {
    fontFamilyName: string;
    fontFamilyStyle: string;
    fontWeight:
        | '400'
        | '500'
        | 'normal'
        | 'bold'
        | '100'
        | '200'
        | '300'
        | '600'
        | '700'
        | '800'
        | '900'
        | undefined;
    fontSize: number;
    lineHeight: number;
    letterSpacing: number;
};

export type VariantSize = {
    large: VariantStyle;
    medium: VariantStyle;
    small: VariantStyle;
};

export type Variant = {
    display: VariantSize;
    headline: VariantSize;
    body: VariantSize;
    label: VariantSize;
    title: VariantSize;
};

export type SearchParameter = {
    query: string;
    queryType?: QUERY_TYPE;
    maxResults?: number;
    startIndex?: number;
    langRestrict?: string;
    orderBy?: ORDER_BY;
    printType?: PRINT_TYPE;
};

export type SearchResult = {
    data: (Book | BookData)[];
    isLoading: boolean;
    isFetching: boolean;
    isSuccess: boolean;
    isError: boolean;
    isUninitialized: boolean;
};

export type AddBookParams = {
    data: Book;
    folders?: string[];
};

export type ModalMethods = {
    present: (data?: any) => void;
    close: () => void;
};
