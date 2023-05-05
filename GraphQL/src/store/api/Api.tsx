import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GRAPH_API } from '../../managers/API/Api';

export const RickApi = createApi({
  reducerPath: 'RickApi',
  tagTypes: ['schema'],
  baseQuery: fetchBaseQuery({ baseUrl: GRAPH_API }),
  endpoints: (build) => ({
    getSchema: build.query({
      query: () => '',
    }),
  }),
});
