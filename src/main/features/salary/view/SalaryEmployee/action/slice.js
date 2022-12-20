import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import {
  addEmployeeSalaryAction,
  getCurrentSalaryOfEmployeeAction,
} from './action';

const initialState = {
  employeeSalary: [],
  currentEmployeeSalary: {},
  loader: false,
  success: false,
};

const employeeSalarySlice = createSlice({
  name: 'employeeSalary',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getCurrentSalaryOfEmployeeAction.fulfilled,
        (state, { payload }) => {
          console.log(payload, 'slice payload');
          state.currentEmployeeSalary = payload.data;
          state.loader = false;
          state.success = true;
        }
      )
      .addCase(addEmployeeSalaryAction.fulfilled, (state, { payload }) => {
        state.employeeSalary = [...state.employeeSalary, ...payload];
        console.log(payload, 'slice payload');
        state.loader = false;
        state.success = true;
      })
      .addMatcher(
        isPending(
          ...[addEmployeeSalaryAction, getCurrentSalaryOfEmployeeAction]
        ),
        (state) => {
          console.log('pending state');
          state.loader = true;
          state.success = true;
        }
      )
      .addMatcher(
        isRejected(
          ...[addEmployeeSalaryAction, getCurrentSalaryOfEmployeeAction]
        ),
        (state) => {
          console.log('rejected state');
          state.loader = false;
          state.success = false;
        }
      );
  },
});

export default employeeSalarySlice.reducer;
