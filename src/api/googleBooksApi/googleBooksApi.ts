import { ImageLinks } from './models/imageLinks';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { OrderBy, PrintType, QueryType } from './models/types';
import { Book } from './models/book';

// define the interface for the query parameters
interface QueryParameter {
  query: string;
  queryType: QueryType | void;
  maxResults: number | void;
  startIndex: number | void;
  langRestrict: string | void;
  orderBy: OrderBy | void;
  printType: PrintType | void;
}

/**
 * Function to replace all the occurrences of a string in another string
 * @param {string} str - The string to replace the occurrences in
 * @param {string} find - The string to find in the str
 * @param {string} replace - The string to replace the find string with
 * @returns {string} - Returns the string with all the occurrences of the find string replaced by the replace string
 */
function replaceAll(str: string, find: string, replace: string) {
  return str.replace(new RegExp(find, 'g'), replace);
}

/**
 * Function to replace all the http occurrences in the image links with https
 * @param {ImageLinks} imageLinks - The image links
 * @returns {ImageLinks} - Returns the image links with all the http occurrences replaced by https
 */
function replaceHttpWithHttps(imageLinks: ImageLinks) {
  let tmp = imageLinks;
  if (imageLinks) {
    tmp.small = tmp.small?.replace('http://', 'https://');
    tmp.medium = tmp.medium?.replace('http://', 'https://');
    tmp.extraLarge = tmp.extraLarge?.replace('http://', 'https://');
    tmp.large = tmp.large?.replace('http://', 'https://');
    tmp.smallThumbnail = tmp.smallThumbnail?.replace('http://', 'https://');
    tmp.thumbnail = tmp.thumbnail?.replace('http://', 'https://');
  }
  return tmp;
}

// define the api
export const googleBooksApi = createApi({
  reducerPath: 'googleBooksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.googleapis.com/books/v1' }),
  tagTypes: ['Book'],
  endpoints(builder) {
    return {
      /**
       * Endpoint to search for books
       * @param {QueryParameter} param - The query parameters
       * @returns {Book[]} - Returns an array of books
       */
      searchBooks: builder.query<Book[], QueryParameter>({
        query: param => ({
          url:
            '/volumes?q=' +
            (param.queryType !== undefined
              ? param.queryType + ':' + replaceAll(param.query.trim(), ' ', '+')
              : replaceAll(param.query.trim(), ' ', '+')) +
            '&maxResults=' +
            param.maxResults +
            '&startIndex=' +
            param.startIndex +
            (param.langRestrict != null
              ? '&langRestrict=' + param.langRestrict
              : '') +
            (param.orderBy != null ? '&orderBy=' + param.orderBy : '') +
            (param.printType != null ? '&printType=' + param.printType : ''),
        }),
        transformResponse: (response: { items: Book[] }, meta) => {
          let books = response.items;
          books.forEach(book => {
            if (book.volumeInfo && book.volumeInfo.imageLinks) {
              book.volumeInfo.imageLinks = replaceHttpWithHttps(
                book.volumeInfo.imageLinks,
              );
            }
          });
          return books;
        },
      }),
      /**
       * Endpoint to get a book by its isbn
       * @param {string} isbn - The isbn of the book
       * @returns {Book | void} - Returns the book or undefined if not found
       */
      getBookByIsbn: builder.query<Book | void, string>({
        query: isbn => ({
          url: `/volumes?q=isbn:${isbn}`,
        }),
        transformResponse: (
          response: { items: Book[]; totalItems: number },
          meta,
        ) => {
          if (response.totalItems) {
            let book = response.items[0];
            if (book.volumeInfo && book.volumeInfo.imageLinks) {
              book.volumeInfo.imageLinks = replaceHttpWithHttps(
                book.volumeInfo.imageLinks,
              );
            }

            return book;
          }
        },
      }),
    };
  },
});

export const { useSearchBooksQuery, useGetBookByIsbnQuery } = googleBooksApi;
export default QueryParameter;
