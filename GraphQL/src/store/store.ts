import { configureStore, PreloadedState, combineReducers } from '@reduxjs/toolkit';

import { RickApi } from './api/Api';
import localizationReducer from './slices/localizationSlice';
import graphDocumentationReducer from './slices/graphDocumentationSlice';
import fontReducer from './slices/fontSlice';
import historyReducer from './slices/historySlice';

const rootReducer = combineReducers({
  [RickApi.reducerPath]: RickApi.reducer,
  localization: localizationReducer,
  graphDocumentation: graphDocumentationReducer,
  font: fontReducer,
  history: historyReducer,
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
