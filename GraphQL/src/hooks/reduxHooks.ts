import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';

import { AppDispatch, RootState } from '@/store/store';
import { ELocalization } from '@/store/type';
import { changeLocalization } from '@/store/slices/localizationSlice';
import { setLocalization } from '@/localStore/localStorage';

const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useChangeLocalization = () => {
  const dispatch = useAppDispatch();

  return useCallback(
    (lang: ELocalization) => {
      setLocalization(lang);
      dispatch(changeLocalization(lang));
    },
    [dispatch]
  );
};

export const useGetLocalization = () => {
  return useAppSelector((state) => state.localization);
};
