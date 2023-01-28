import { Book } from './../../api/googleBooksApi/models/book';

export interface BookData {
  book: Book;
  currentPage: number;
  favorite: boolean;
  removed: boolean;
}
