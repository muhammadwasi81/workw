<<<<<<< HEAD
import { createSlice, isPending } from '@reduxjs/toolkit';
import { createQuotation, getAllQuotation, getQuotationById } from './actions';
=======
import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { createQuotation, getAllQuotation, getQuotationById } from "./actions";
>>>>>>> 5f5b33e5297dfd7c6f1d80485ef1f1894a95e2ef

const initialState = {
  editData: null,
  success: false,
  loader: false,
  error: false,
  quotationDetail: null,
  quotationList: [],
  createLoader: false,
};

export const quotationSlice = createSlice({
  name: 'Quotation',
  initialState: initialState,
  reducers: {
    clearSalaryDetail: (state) => {
      state.quotationDetail = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createQuotation.fulfilled, (state, { payload }) => {
        state.createLoader = false;
        state.success = true;
        state.quotationList = [...state.quotationList, ...payload];
      })
      .addCase(getQuotationById.fulfilled, (state, { payload }) => {
        state.quotationDetail = payload;
        state.loader = false;
        state.success = true;
      })
      .addCase(getAllQuotation.fulfilled, (state, { payload }) => {
        state.loader = false;
        // state.success = true;
        state.quotationList = payload.data;
      })
      .addMatcher(isPending(...[createQuotation]), (state) => {
        state.createLoader = true;
        state.success = false;
        state.error = false;
      })
      .addMatcher(isPending(...[getAllQuotation]), (state) => {
        state.loader = true;
        state.success = false;
        state.error = false;
      })
      .addMatcher(
        isRejected(...[createQuotation, getAllQuotation]),
        (state) => {
          state.loader = false;
          state.createLoader = false;
          state.success = false;
          state.error = false;
        }
      );
  },
});
export const { clearSalaryDetail } = quotationSlice.actions;
export default quotationSlice.reducer;
