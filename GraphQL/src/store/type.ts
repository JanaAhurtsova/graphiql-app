export type TUserSlice = {
  email: null | string;
  id: null | string;
  token: null | string;
};

export type TLanguageSlice = {
  lang: ELocalization;
};

export enum ELocalization {
  en = 'en',
  ru = 'ru',
}
