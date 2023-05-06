import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode.js";
import {
  getGreadeAllowance,
  getGreadeData,
  addGradeAllowance,
  getAllAllowanceGreadeData,
} from "./action";

const initialState = {
  allowances: [],
  gradeAllowances: [],
  gradesData: [],
  loadingData: false,
  loader: false,
  success: false,
  error: false,
  defaultInputValue: {},
};

const AllGreadeAllowance = createSlice({
  name: "AllGreadeAllowance",
  initialState,
  reducers: {
    updateInput: (state, action) => {
      state.defaultInputValue = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getGreadeAllowance.fulfilled, (state, { payload }) => {
      state.loadingData = false;
      state.allowances = payload.data;
    });
    builder.addCase(getGreadeData.fulfilled, (state, { payload }) => {
      state.loadingData = false;
      state.gradesData = payload.data;
    });
    builder.addCase(addGradeAllowance.fulfilled, (state, { payload }) => {
      if (payload.responseCode === responseCode.Success) state.loader = false;
    });
    builder.addCase(addGradeAllowance.pending, (state, { payload }) => {
      state.loader = true;
    });
    builder.addCase(
      getAllAllowanceGreadeData.fulfilled,
      (state, { payload }) => {
        state.loadingData = false;
        state.gradeAllowances = payload.data;
      }
    );
  },
});
export const { updateInput } = AllGreadeAllowance.actions;
export default AllGreadeAllowance.reducer;
