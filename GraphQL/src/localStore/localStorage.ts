import { IItemHistoryState } from '@/store/type';
import { ELocalization, TLanguageSlice } from '@/store/type';

export function getLocalization(): TLanguageSlice {
  return {
    lang: <ELocalization>localStorage.getItem('lang') ?? ELocalization.en,
  };
}

export function setLocalization(lang: ELocalization): void {
  localStorage.setItem('lang', lang);
}

export function getHistory() {
  if (!localStorage.getItem('history')) {
    return { list: [] };
  }
  return JSON.parse(localStorage.getItem('history') ?? '');
}

export function setHistory(history: IItemHistoryState) {
  localStorage.setItem('history', JSON.stringify(history));
}
