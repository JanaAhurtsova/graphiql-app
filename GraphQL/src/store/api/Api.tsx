import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GRAPH_API, Api } from 'managers/API/Api';
import { IQuery } from './type';

export const RickApi = createApi({
  reducerPath: Api.RICK_API,
  tagTypes: [Api.SCHEMA],
  baseQuery: fetchBaseQuery({ baseUrl: GRAPH_API }),
  endpoints: (build) => ({
    getResponse: build.query({
      query: ({ arg, variables, headers }: IQuery) => ({
        url: '',
        method: Api.POST,
        headers: {
          'Content-type': 'application/json',
          ...headers,
        },
        body: JSON.stringify({ query: arg, variables: variables }),
      }),
    }),
  }),
});

export const { useLazyGetResponseQuery } = RickApi;
