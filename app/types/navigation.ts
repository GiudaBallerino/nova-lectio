import { Book, BookData } from './entities';

export type RootStackParamList = {
    //Auth
    TabView: undefined;
    Book: { book: Book | BookData };
    Search: undefined;
    Folders: undefined;
    Stats: undefined;

    //Bottom Tab
    Bookshelf: undefined;
    Gallery: undefined;
    More: undefined;
};

export type TabStackParamList = {
    [key: string]: { folder: string };
};
