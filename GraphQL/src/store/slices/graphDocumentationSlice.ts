import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TGraphDocumentationSlice } from '../type';
import { TSchemaServer } from 'components/documentationGraph/type';
import { Name } from '@/managers/slice/Slice';

const initialState = {
  doc: {
    queryType: {
      name: 'Query',
    },
    types: [],
  },
};

const graphDocumentationSlice = createSlice({
  name: Name.DOCUMENTATION,
  initialState,
  reducers: {
    setGraphDocumentation(state: TGraphDocumentationSlice, action: PayloadAction<TSchemaServer>) {
      state.doc = action.payload;
    },
  },
});

export const { setGraphDocumentation } = graphDocumentationSlice.actions;

export default graphDocumentationSlice.reducer;
