import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';

import { AppDispatch, RootState } from '@/store/store';
import { removeUser, setUser } from '@/store/slices/userSlice';
import { ELocalization, TUserSlice } from '@/store/type';
import { changeLocalization } from '@/store/slices/localizationSlice';
import { endSession, startSession } from '@/localStore/userAuthCookie';
import { setLocalization } from '@/localStore/localStorage';

export const useSetUser = () => {
  const dispatch = useAppDispatch();

  return useCallback(
    (user: TUserSlice) => {
      startSession(String(user.email), String(user.token), String(user.id));
      dispatch(setUser(user));
    },
    [dispatch]
  );
};

export const useRemoveUser = () => {
  const dispatch = useAppDispatch();
  return useCallback(() => {
    endSession();
    dispatch(removeUser());
  }, [dispatch]);
};

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

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
