import { configureStore, PreloadedState, combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import localization from './slices/localizationSlice';

const rootReducer = combineReducers({
  user: userReducer,
  localization: localization,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
