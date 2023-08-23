import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NYT_API_KEY } from '../configs/constants';
import { BestSellersResponse } from '../types/responses';
import { BestSeller } from '../types/entities';
import BookFactory from '../factories/bookFactory';

export const newYorkTimesApi = createApi({
    reducerPath: 'newYorkTimesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.nytimes.com/svc/books/v3'
    }),
    endpoints: build => ({
        getBestSellers: build.query<BestSeller[], void>({
            query: () => ({
                url: `/lists/current/hardcover-fiction.json?api-key=${NYT_API_KEY}`
            }),
            transformResponse: (response: BestSellersResponse) => {
                return BookFactory.fromBestSellersResponseToMultipleBestSellers(response);
            }
        })
    })
});

export const { useGetBestSellersQuery } = newYorkTimesApi;
