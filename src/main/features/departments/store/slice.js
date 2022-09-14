import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { getAllDepartments } from "./actions";

const initialState = {
  departments: [],
  loadingData: false,
  loader: false,
  success: false,
  error: false,
  departmentDetail: null,
};

const departmentSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDepartments.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.departments = payload ? payload : [];
        state.loader = false;
      })
      //   .addCase(addDepartment.fulfilled, (state, { payload }) => {
      //     console.log("********", payload);
      //   })
      .addMatcher(isPending(...[getAllDepartments]), (state) => {
        console.log("its pending");
        state.loader = true;
      })
      .addMatcher(isRejected(...[getAllDepartments]), (state) => {
        state.loader = true;
      });
  },
});

export const {} = departmentSlice.actions;
export default departmentSlice.reducer;
