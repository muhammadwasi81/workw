import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import {
  addEmployeeAction,
  getAllEmployeeAction,
  getEmployeeByIdAction,
  updateEmployeeAction,
} from './action';

const initialState = {
  success: false,
  employees: [],
  loadingData: false,
  loader: false,
};

const employeeProfileSlice = createSlice({
  name: 'Employee',
  initialState,
  reducers: {
    clearEmployeeDetails: (state) => {
      state.employeeDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllEmployeeAction.fulfilled, (state, action) => {
      console.log(action.payload, 'getAllEmployee slice');
      state.employees = action.payload ? action.payload : [];
      state.loader = false;
    });
    builder.addCase(getEmployeeByIdAction.fulfilled, (state, action) => {
      console.log(action.payload.data, 'getEmployeeById slice');
      state.employees = action.payload.data;
      state.loader = false;
    });
    builder.addCase(addEmployeeAction.fulfilled, (state, { payload }) => {
      console.log(payload, 'addEmployee slice');
      state.success = true;
      state.employees = [...state.employees, payload.data.data];
      state.loader = false;
    });
    builder
      .addCase(updateEmployeeAction.fulfilled, (state, { payload }) => {
        console.log(payload, 'updateEmployee slice');
        state.success = true;
        state.employees = [...state.employees, payload.data.data];
        state.loader = false;
      })
      .addMatcher(isPending(...[getAllEmployeeAction]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[getEmployeeByIdAction]), (state) => {
        state.loader = true;
      })
      .addMatcher(isRejected(...[getAllEmployeeAction]), (state) => {
        state.loader = true;
      });
  },
});

export const { clearEmployeeDetails } = employeeProfileSlice.actions;
export default employeeProfileSlice.reducer;
