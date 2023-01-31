import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode.js";
import {
  getAllEmployeeRebate,
  addEmployeeRebate,
  updateEmployeeRebate,
  removeEmployeeRebate,
} from "./actions.js";

const initialState = {
  employeeRebate: [],
  loadingData: false,
  loader: false,
  success: false,
  error: false,
};

const employeeRebateSlice = createSlice({
  name: "EmployeeRebate",
  initialState,
  reducers: {
    // rebateDeleted: (state, { payload }) => {
    //   state.rebateCategories = state.rebateCategories.filter(
    //     (e) => e.id !== payload.id
    //   );
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllEmployeeRebate.fulfilled, (state, { payload }) => {
        state.loadingData = false;
        state.employeeRebate = payload.data;
      })
      .addCase(addEmployeeRebate.fulfilled, (state, { payload }) => {
        state.loader = false;
        if (payload.responseCode === responseCode.Success)
          state.employeeRebate.push(payload.data);
      })
      .addCase(updateEmployeeRebate.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.employeeRebate = state.employeeRebate.map((x) =>
          x.id === payload.data.id ? payload.data : x
        );
      })
      .addMatcher(
        isPending(...[addEmployeeRebate, updateEmployeeRebate]),
        (state) => {
          state.loader = true;
          state.success = false;
          state.error = false;
        }
      )
      .addMatcher(isPending(...[getAllEmployeeRebate]), (state) => {
        state.loadingData = true;
        state.success = false;
        state.error = false;
      })
      .addMatcher(
        isRejected(
          ...[getAllEmployeeRebate, addEmployeeRebate, updateEmployeeRebate]
        ),
        (state) => {
          state.loader = false;
          state.loadingData = false;
          state.success = false;
          state.error = false;
        }
      );
  },
});

// export const { rebateCategoryDeleted } = employeeRebateSlice.actions;
export default employeeRebateSlice.reducer;
