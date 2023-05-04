import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ELocalization } from '../type';

const localizationSlice = createSlice({
  name: 'localization',
  initialState: ELocalization.en,
  reducers: {
    changeLocalization(state: ELocalization, action: PayloadAction<ELocalization>) {
      state = action.payload;
    },
  },
});

export const { changeLocalization } = localizationSlice.actions;

export default localizationSlice.reducer;
