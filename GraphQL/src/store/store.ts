import { configureStore, PreloadedState, combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import { RickApi } from './api/Api';

const rootReducer = combineReducers({
  [RickApi.reducerPath]: RickApi.reducer,
  user: userReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ immutableCheck: false }).concat(RickApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
