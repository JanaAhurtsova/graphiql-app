import { TSchemaServer } from '@/components/documentationGraph/type';
export interface IQuery extends Omit<RequestInit, 'headers'> {
  query: string;
  variables: object;
  headers?: HeadersInit | (() => HeadersInit);
}

export interface IResponseSchema {
  data: {
    __schema: TSchemaServer;
  };
}
