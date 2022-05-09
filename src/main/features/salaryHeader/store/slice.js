import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode.js";
import { addSalaryHeader, getAllSalaryHeader, updateSalaryHeader } from "./actions.js";

const initialState = {
  salaryHeaders: [],
  loadingData: false,
  loader: false,
};

const salaryHeaderSlice = createSlice({
  name: "salaryHeader",
  initialState,
  reducers: {
    salaryHeaderDeleted: (state, { payload }) => {
      state.salaryHeaders = state.salaryHeaders.filter((e) => e.id !== payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSalaryHeader.fulfilled, (state, { payload }) => {
        state.loadingData = false;
        state.salaryHeaders = payload.data;
      })
      .addCase(addSalaryHeader.fulfilled, (state, { payload }) => {
        state.loader = false;
        if (payload.responseCode === responseCode.Success)
          state.salaryHeaders.push(payload.data);
      })
      .addCase(updateSalaryHeader.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.salaryHeaders = state.salaryHeaders.map((x) =>
          x.id === payload.data.id ? payload.data : x
        );
      })
      .addMatcher(isPending(...[addSalaryHeader, updateSalaryHeader]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[getAllSalaryHeader]), (state) => {
        state.loadingData = true;
      })
      .addMatcher(
        isRejected(...[getAllSalaryHeader, addSalaryHeader, updateSalaryHeader]),
        (state) => {
          state.loader = false;
          state.loadingData = false;
        }
      );
  },
});

export const { salaryHeaderDeleted } = salaryHeaderSlice.actions;
export default salaryHeaderSlice.reducer;
