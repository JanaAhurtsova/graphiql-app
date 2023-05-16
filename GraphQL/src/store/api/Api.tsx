import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getIntrospectionQuery } from 'graphql';

import { GRAPH_API, Api } from 'managers/API/Api';
import { IQuery } from './type';

export const RickApi = createApi({
  reducerPath: Api.RICK_API,
  tagTypes: [Api.SCHEMA],
  baseQuery: fetchBaseQuery({ baseUrl: GRAPH_API }),
  endpoints: (build) => ({
    getResponse: build.query({
      query: ({ query, variables, headers }: IQuery) => ({
        url: '',
        method: Api.POST,
        headers: {
          'Content-type': 'application/json',
          ...headers,
        },
        body: JSON.stringify({ query: query, variables: variables }),
      }),
    }),
    getSchema: build.query({
      query: ({}) => ({
        url: '',
        method: Api.POST,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: getIntrospectionQuery(),
        }),
      }),
    }),
  }),
});

export const { useLazyGetResponseQuery, useLazyGetSchemaQuery } = RickApi;
