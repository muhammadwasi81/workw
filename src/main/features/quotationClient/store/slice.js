import { createSlice, isPending } from "@reduxjs/toolkit";
import {
  createClientQuotation,
  getAllQuotation,
  getQuotationById,
} from "./actions";

const initialState = {
  editData: null,
  success: false,
  loader: false,
  error: false,
  quotationClientDetail: null,
  quotationClientList: [],
};

export const quotationClientSlice = createSlice({
  name: "QuotationClient",
  initialState: initialState,
  reducers: {
    clearSalaryDetail: (state) => {
      state.quotationClientDetail = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createClientQuotation.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.success = true;
        state.quotationClientList = [...state.quotationClientList, ...payload];
      })
      .addCase(getQuotationById.fulfilled, (state, { payload }) => {
        state.quotationClientDetail = payload;
        state.loader = false;
        state.success = true;
      })
      .addCase(getAllQuotation.fulfilled, (state, { payload }) => {
        state.quotationClientList = payload.data;
        state.loader = false;
        state.success = true;
      })
      .addMatcher(isPending(...[createClientQuotation]), (state) => {
        state.loader = true;
        state.success = false;
        state.error = false;
      });
  },
});
export const { clearSalaryDetail } = quotationClientSlice.actions;
export default quotationClientSlice.reducer;
