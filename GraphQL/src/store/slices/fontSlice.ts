import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fontSize: 14,
};

export const fontSlice = createSlice({
  name: 'font',
  initialState,
  reducers: {
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
    },
  },
});

export const { setFontSize } = fontSlice.actions;
export default fontSlice.reducer;
