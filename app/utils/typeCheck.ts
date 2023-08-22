import {Book, BookData} from '../types/entities';

export const isBook = (object: any): object is Book => {
    return 'volumeInfo' in object;
};

export const isBookData = (object: any): object is BookData => {
    return 'currentPage' in object;
};

