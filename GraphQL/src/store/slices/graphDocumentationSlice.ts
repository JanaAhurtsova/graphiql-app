import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TGraphDocumentationSlice } from '../type';
import { TDocumentation } from '@/components/documentationGraph/type';

const graphDocumentationSlice = createSlice({
  name: 'graphDocumentation',
  initialState: { doc: null },
  reducers: {
    setGraphDocumentation(state: TGraphDocumentationSlice, action: PayloadAction<TDocumentation>) {
      state.doc = action.payload;
    },
  },
});

export const { setGraphDocumentation } = graphDocumentationSlice.actions;

export default graphDocumentationSlice.reducer;
