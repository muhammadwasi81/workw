import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import { responseCode } from '../../../../services/enums/responseCode.js';
import {
  addFiscalYear,
  getAllFiscalYear,
  updateFiscalYear,
} from './actions.js';

const initialState = {
  FiscalYear: [],
  loadingData: false,
  loader: false,
  createLoader:false,
};

const fiscalYearSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    FiscalYearDeleted: (state, { payload }) => {
      state.FiscalYear = state.FiscalYear.filter((e) => e.id !== payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllFiscalYear.fulfilled, (state, { payload }) => {
        state.loadingData = false;
        state.createLoader = false;
        state.FiscalYear = payload.data;
        console.log("statestate",payload.data);
      })
      .addCase(addFiscalYear.fulfilled, (state, { payload }) => {
        state.loader = false;
        if (payload.responseCode === responseCode.Success)
          state.FiscalYear.push(payload.data);
      })
      .addCase(updateFiscalYear.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.FiscalYear = state.FiscalYear.map((x) =>
          x.id === payload.data.id ? payload.data : x
        );
      })
      .addMatcher(isPending(...[addFiscalYear, updateFiscalYear]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[getAllFiscalYear]), (state) => {
        state.loadingData = true;
        state.createLoader = true;
      })
      .addMatcher(
        isRejected(...[getAllFiscalYear, addFiscalYear, updateFiscalYear]),
        (state) => {
          state.loader = false;
          state.loadingData = false;
          state.createLoader = false;
        }
      );
  },
});

export const { FiscalYearDeleted } = fiscalYearSlice.actions;
export default fiscalYearSlice.reducer;
