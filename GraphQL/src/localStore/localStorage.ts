import { ELocalization, TLanguageSlice } from '@/store/type';

export function getLocalization(): TLanguageSlice {
  return {
    lang: <ELocalization>localStorage.getItem('lang') ?? ELocalization.en,
  };
}

export function setLocalization(lang: ELocalization): void {
  localStorage.setItem('lang', lang);
}
