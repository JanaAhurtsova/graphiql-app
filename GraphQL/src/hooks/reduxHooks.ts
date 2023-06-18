import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';

import { AppDispatch, RootState } from '@/store/store';
import { ELocalization, IItemHistory } from '@/store/type';
import { changeLocalization } from '@/store/slices/localizationSlice';
import { setLocalization } from '@/localStore/localStorage';
import { setGraphDocumentation } from '@/store/slices/graphDocumentationSlice';
import { setFontSize } from '@/store/slices/fontSlice';
import { addItemHistory } from '@/store/slices/historySlice';
import { useLazyGetSchemaQuery } from '../store/api/Api';

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
  const [getDocumentation, { data: docs }] = useLazyGetSchemaQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (docs) {
      dispatch(setGraphDocumentation(docs));
    }
  }, [dispatch, docs]);

  return { getDocumentation, docs };
};

export const useGetDocumentationGraph = () => {
  return useAppSelector((state) => state.graphDocumentation);
};

export const useSetFontSize = () => {
  const fontSize = useAppSelector((state) => state.font.fontSize);
  const [fontStyle, setFontStyle] = useState(fontSize);

  useEffect(() => {
    setFontStyle(fontSize);
  }, [fontSize]);

  return fontStyle;
};

export const useAddHistory = () => {
  const dispatch = useAppDispatch();

  return useCallback(
    (history: IItemHistory) => {
      dispatch(addItemHistory(history));
    },
    [dispatch]
  );
};

export const useGetHistory = () => {
  return useAppSelector((state) => state.history);
};
