import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Book } from '../types/entities';
import { SearchParameter } from '../types/structs';
import { SearchVolumesResponse } from '../types/responses';
import BookFactory from '../factories/bookFactory';
import axios, { AxiosResponse } from 'axios';

function replaceAll(str: string, find: string, replace: string) {
    return str.replace(new RegExp(find, 'g'), replace);
}

export const getBookByIsbn = async (isbn: string) =>
    axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
        .then((result: AxiosResponse<SearchVolumesResponse>) => {
            return result.data;
        })
        .catch(
            () =>
                ({
                    kind: '',
                    totalItems: 0,
                    items: []
                } as SearchVolumesResponse)
        );

export const googleBooksApi = createApi({
    reducerPath: 'googleBooksApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://www.googleapis.com/books/v1' }),
    tagTypes: ['Book'],
    endpoints(builder) {
        return {
            searchBooks: builder.query<Book[], SearchParameter>({
                query: param => ({
                    url: `/volumes?q=${
                        param.queryType
                            ? `${param.queryType}':'${replaceAll(param.query.trim(), ' ', '+')}`
                            : replaceAll(param.query.trim(), ' ', '+')
                    }${param.maxResults ? `&maxResult=${param.maxResults}` : ''}${
                        param.startIndex ? `&startIndex=${param.startIndex}` : ''
                    }${param.langRestrict ? `&langRestrict=${param.langRestrict}` : ''}${
                        param.orderBy ? `&orderBy=${param.orderBy}` : ''
                    }${param.printType ? `&printType=${param.printType}` : ''}`
                }),
                transformResponse: (response: SearchVolumesResponse) => {
                    return BookFactory.fromSearchVolumesResponseToBooks(response);
                }
            }),
            getBookByIsbn: builder.query<Book, string>({
                query: param => ({
                    url: `/volumes?q=isbn:${param}`
                }),
                transformResponse: (response: SearchVolumesResponse) => {
                    return BookFactory.fromSearchVolumesResponseToSingleBook(response);
                }
            })
        };
    }
});

export const { useLazySearchBooksQuery, useGetBookByIsbnQuery } = googleBooksApi;
