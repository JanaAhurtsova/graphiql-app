export interface IQuery extends Omit<RequestInit, 'headers'> {
  arg: string;
  variables: object;
  headers?: HeadersInit | (() => HeadersInit);
}
