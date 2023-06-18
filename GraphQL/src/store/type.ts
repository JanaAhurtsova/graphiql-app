import { TSchemaServer } from '@/components/documentationGraph/type';

export type TLanguageSlice = {
  lang: ELocalization;
};

export enum ELocalization {
  en = 'en',
  ru = 'ru',
}

export type TGraphDocumentationSlice = {
  doc: null | TSchemaServer;
};

export type IItemHistory = {
  headers: string;
  variables: string;
  query: string;
};

export type IItemHistoryState = {
  list: IItemHistory[];
};
