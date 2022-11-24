import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import { responseCode } from '../../../../services/enums/responseCode.js';
import {
  addFiscalYear,
  getAllFiscalYear,
  updateFiscalYear,
} from './actions.js';

const initialState = {
  items: [],
  loadingData: false,
  loader: false,
};

const fiscalYearSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    FiscalYearDeleted: (state, { payload }) => {
      state.items = state.items.filter((e) => e.id !== payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllFiscalYear.fulfilled, (state, { payload }) => {
        state.loadingData = false;
        state.items = payload.data;
      })
      .addCase(addFiscalYear.fulfilled, (state, { payload }) => {
        state.loader = false;
        if (payload.responseCode === responseCode.Success)
          state.items.push(payload.data);
      })
      .addCase(updateFiscalYear.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.items = state.items.map((x) =>
          x.id === payload.data.id ? payload.data : x
        );
      })
      .addMatcher(isPending(...[addFiscalYear, updateFiscalYear]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[getAllFiscalYear]), (state) => {
        state.loadingData = true;
      })
      .addMatcher(
        isRejected(...[getAllFiscalYear, addFiscalYear, updateFiscalYear]),
        (state) => {
          state.loader = false;
          state.loadingData = false;
        }
      );
  },
});

export const { FiscalYearDeleted } = fiscalYearSlice.actions;
export default fiscalYearSlice.reducer;
