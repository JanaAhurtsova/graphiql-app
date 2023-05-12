export interface IQuery extends Omit<RequestInit, 'headers'> {
  query: string;
  variables: object;
  headers?: HeadersInit | (() => HeadersInit);
}
