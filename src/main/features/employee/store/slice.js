import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addEmployee, getAllEmployees } from "./actions";

const initialState = {
  employees: [],
  loader: false,
  success: false,
  error: false,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEmployee.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.success = true;
      })
      .addCase(getAllEmployees.fulfilled, (state, { payload }) => {
        state.employees = payload.data;
        state.loader = false;
        state.success = true;
      })
      .addMatcher(isPending(...[addEmployee, getAllEmployees]), (state) => {
        console.log("pending");
        state.loader = true;
        state.success = false;
      })
      .addMatcher(isRejected(...[addEmployee, getAllEmployees]), (state) => {
        state.loader = false;
        state.success = false;
      });
  },
});
export default employeeSlice.reducer;
