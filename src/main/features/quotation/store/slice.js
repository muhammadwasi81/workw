import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { createQuotation, getAllQuotation, getQuotationById } from "./actions";

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
  name: "Quotation",
  initialState: initialState,
  reducers: {
    clearSalaryDetail: (state) => {
      state.quotationDetail = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createQuotation.fulfilled, (state, { payload }) => {
        console.log(payload, "payloaddd");
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
