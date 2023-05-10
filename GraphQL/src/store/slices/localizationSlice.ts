import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ELocalization, TLanguageSlice } from '../type';

const localizationSlice = createSlice({
  name: 'localization',
  initialState: { lang: ELocalization.en },
  reducers: {
    changeLocalization(state: TLanguageSlice, action: PayloadAction<ELocalization>) {
      state.lang = action.payload;
    },
  },
});

export const { changeLocalization } = localizationSlice.actions;

export default localizationSlice.reducer;
