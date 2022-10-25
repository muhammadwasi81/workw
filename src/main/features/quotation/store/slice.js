import { createSlice, isPending } from "@reduxjs/toolkit";
import {
  createQuotation,
  addMultipleEmployeeSalary,
  getAllEmployeeSalary,
  getEmployeeSalaryDetail,
} from "./actions";

const initialState = {
  editData: null,
  success: false,
  loader: false,
  error: false,
  quotationDetail: null,
  quotationList: [],
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
        state.loader = false;
        state.success = true;
        state.quotationList = [...state.quotationList, ...payload];
      })

      .addCase(getEmployeeSalaryDetail.fulfilled, (state, { payload }) => {
        state.quotationDetail = payload;
        state.loader = false;
        state.success = true;
      })
      .addCase(getAllEmployeeSalary.fulfilled, (state, { payload }) => {
        state.quotationList = payload.data;
        state.loader = false;
        state.success = true;
      })
      .addMatcher(isPending(...[createQuotation]), (state) => {
        state.loader = true;
        state.success = false;
        state.error = false;
      });
  },
});
export const { clearSalaryDetail } = quotationSlice.actions;
export default quotationSlice.reducer;
