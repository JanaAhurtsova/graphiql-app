import { createSlice } from '@reduxjs/toolkit';
import { Name } from '@/managers/slice/Slice';

const initialState = {
  fontSize: 14,
};

export const fontSlice = createSlice({
  name: Name.FONT,
  initialState,
  reducers: {
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
    },
  },
});

export const { setFontSize } = fontSlice.actions;
export default fontSlice.reducer;
