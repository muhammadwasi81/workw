import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { getAllDepartments, addDepartment, getDepartmentById } from "./actions";

const initialState = {
  departments: [],
  loadingData: false,
  createLoader: false,
  loader: false,
  success: false,
  error: false,
  drawerOpen: false,
  departmentDetail: {},
};

const departmentSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDepartments.fulfilled, (state, { payload }) => {
        // console.log(payload);
        state.departments = payload ? payload : [];
        state.loader = false;
      })
      .addCase(addDepartment.fulfilled, (state, { payload }) => {
        console.log("*****", payload.data);
        if (payload.data.data) {
          console.log("before adding", state.departments);
          state.departments.unshift(payload.data.data);
          console.log("after adding", state.departments);
        }
        state.success = true;
      })
      .addCase(getDepartmentById.fulfilled, (state, { payload }) => {
        console.log("GetDepartmentById payload", payload.data);
        state.departmentDetail = payload.data;
        state.loading = false;
      })
      .addMatcher(isPending(...[addDepartment]), (state) => {
        console.log("its pending");
        state.createLoader = true;
      })
      .addMatcher(isPending(...[getAllDepartments]), (state) => {
        console.log("its pending");
        state.createLoader = true;
      })
      .addMatcher(isRejected(...[getAllDepartments]), (state) => {
        state.loader = true;
      });
  },
});

export const {} = departmentSlice.actions;
export default departmentSlice.reducer;
