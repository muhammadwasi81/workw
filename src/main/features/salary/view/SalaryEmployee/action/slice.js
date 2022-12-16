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
      .addCase(addEmployeeSalaryAction.fulfilled, (state, action) => {
        console.log(action.payload, 'updateUserEmergencyContactAction Slice');
        state.employeeSalary.push(action.payload);
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
