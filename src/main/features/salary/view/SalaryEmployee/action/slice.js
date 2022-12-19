import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import { addEmployeeSalaryAction } from './action';

const initialState = {
  employeeSalary: [],
  loader: false,
  success: false,
};

const employeeSalarySlice = createSlice({
  name: 'employeeSalary',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEmployeeSalaryAction.fulfilled, (state, { payload }) => {
        state.employeeSalary = [...state.employeeSalary, ...payload];
        console.log(payload, 'slice payload');
        state.loader = false;
        state.success = true;
      })
      .addMatcher(isPending(...[addEmployeeSalaryAction]), (state) => {
        console.log('pending state');
        state.loader = true;
      })
      .addMatcher(isRejected(...[addEmployeeSalaryAction]), (state) => {
        console.log('rejected state');
        state.loader = false;
      });
  },
});

export default employeeSalarySlice.reducer;
