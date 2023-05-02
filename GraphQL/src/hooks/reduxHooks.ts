import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';

import { AppDispatch, RootState } from '../store/store';
import { removeUser, setUser } from '../store/slices/userSlice';
import { TUserSlice } from '../store/slices/type';

export const useSetUser = () => {
  const dispatch = useAppDispatch();

  return useCallback(
    (user: TUserSlice) => {
      dispatch(setUser(user));
    },
    [dispatch]
  );
};

export const useRemoveUser = () => {
  const dispatch = useAppDispatch();
  return useCallback(() => dispatch(removeUser()), [dispatch]);
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
