import NYTAPIKEY from '../../config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BestSellers, BestSellerBook } from './models/bestSellers';

// define the api
export const newYorkTimesApi = createApi({
  reducerPath: 'newYorkTimesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.nytimes.com/svc/books/v3',
  }),
  endpoints(builder) {
    return {
      /**
       * Endpoint to get the best sellers
       * @returns {BestSellerBook[]} - Returns an array of best seller books
       */
      getBestSellers: builder.query<BestSellerBook[], void>({
        query: () => ({
          url: `/lists.json?list-name=hardcover-fiction&api-key=${NYTAPIKEY}`,
        }),
        transformResponse: async (response: BestSellers, meta) => {
          return response.results;
        },
      }),
    };
  },
});

export const { useGetBestSellersQuery } = newYorkTimesApi;
