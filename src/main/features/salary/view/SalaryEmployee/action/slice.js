import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  addEmployeeSalaryAction,
  getCurrentSalaryOfEmployeeAction,
  getEmployeeSalaryAction,
} from "./action";
import { getAllAllowanceGreadeData } from "../../../../gradeAllowance/store/action";

const initialState = {
  employeeSalary: [],
  currentEmployeeSalary: [],
  loader: false,
  success: false,
  AllGradeAllowance: [],
};

const employeeSalarySlice = createSlice({
  name: "employeeSalary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeSalaryAction.fulfilled, (state, { payload }) => {
        console.log(payload, "slice payload");
        state.currentEmployeeSalary = payload;
        state.loader = false;
        state.success = true;
      })
      .addCase(getAllAllowanceGreadeData.fulfilled, (state, { payload }) => {
        console.log(payload, "ddddddddddd");
        state.AllGradeAllowance = payload.data;
        state.loader = false;
        state.success = true;
      })
      .addCase(addEmployeeSalaryAction.fulfilled, (state, { payload }) => {
        state.employeeSalary = [...state.employeeSalary, ...payload];
        state.currentEmployeeSalary = [
          ...state.currentEmployeeSalary,
          ...payload,
        ];
        console.log(payload, "slice payload");
        state.loader = false;
        state.success = true;
      })
      .addMatcher(
        isPending(
          ...[addEmployeeSalaryAction, getCurrentSalaryOfEmployeeAction]
        ),
        (state) => {
          console.log("pending state");
          state.loader = true;
          state.success = true;
        }
      )
      .addMatcher(
        isRejected(
          ...[addEmployeeSalaryAction, getCurrentSalaryOfEmployeeAction]
        ),
        (state) => {
          console.log("rejected state");
          state.loader = false;
          state.success = false;
        }
      );
  },
});

export default employeeSalarySlice.reducer;
