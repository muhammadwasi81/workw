import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addDepartment, addReward, getAllDepartments, GetRewardById } from "./actions";

const initialState = {
  departments: [],
  loadingData: false,
  loader: true,
  departmentDetail: null,
};

const departmentSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllDepartments.fulfilled, (state, action) => {
      state.departments = action.payload ? action.payload : [];
      state.loader = false;
    });

    builder.addCase(GetRewardById.fulfilled, (state, action) => {
      console.log("action.payload", action.payload);
      state.departmentDetail = action.payload.data;
    });

    builder
      .addCase(addDepartment.fulfilled, (state, { payload }) => {
        state.departmentData = payload;
        return state;
      })
      .addMatcher(isPending(...[getAllDepartments]), (state) => {
        state.loader = true;
      })
      .addMatcher(isRejected(...[getAllDepartments]), (state) => {
        state.loader = true;
      });
  },
});

export const {} = departmentSlice.actions;
export default departmentSlice.reducer;
