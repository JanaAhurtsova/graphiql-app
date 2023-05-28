import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IItemHistory, IItemHistoryState } from '../type';
import { MAX_NUM_HISTORY } from '@/managers/slice/enum';

const initialState: IItemHistoryState = {
  list: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState: initialState,
  reducers: {
    addItemHistory(state: IItemHistoryState, action: PayloadAction<IItemHistory>) {
      const first = state.list.length ? state.list[0] : null;
      if (first) {
        if (
          first.headers !== action.payload.headers ||
          first.query !== action.payload.query ||
          first.variables !== action.payload.variables
        ) {
          state.list.unshift(action.payload);
        }
      } else {
        state.list.unshift(action.payload);
      }
      if (state.list.length > MAX_NUM_HISTORY) {
        state.list.pop();
      }
    },
  },
});

export const { addItemHistory } = historySlice.actions;

export default historySlice.reducer;
