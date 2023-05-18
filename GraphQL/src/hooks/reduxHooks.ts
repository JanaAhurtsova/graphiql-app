import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';

import { AppDispatch, RootState } from '@/store/store';
import { ELocalization } from '@/store/type';
import { changeLocalization } from '@/store/slices/localizationSlice';
import { setLocalization } from '@/localStore/localStorage';
import { TSchemaServer } from '@/components/documentationGraph/type';
import { setGraphDocumentation } from '@/store/slices/graphDocumentationSlice';
import { setFontSize } from '@/store/slices/fontSlice';

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

export const useChangeFontSize = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (value: number) => {
      dispatch(setFontSize(value));
    },
    [dispatch]
  );
};

export const useGetLocalization = () => {
  return useAppSelector((state) => state.localization);
};

export const useSetDocumentationGraph = () => {
  const dispatch = useAppDispatch();

  return useCallback(
    (doc: TSchemaServer) => {
      dispatch(setGraphDocumentation(doc));
    },
    [dispatch]
  );
};

export const useGetDocumentationGraph = () => {
  return useAppSelector((state) => state.graphDocumentation);
};
