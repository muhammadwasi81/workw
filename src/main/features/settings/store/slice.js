import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  getBasicInfoAction,
  updateProfileAction,
  updateEmployeeEmailAction,
  updateEmployeePhoneAction,
  updateEmployeeStatusAction,
  updatePasswordAction,
} from "./action";

const initialState = {
  success: false,
  loadingData: false,
  loader: false,
  settings: {},
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBasicInfoAction.fulfilled, (state, action) => {
        state.settings = action.payload.data;
        state.loader = false;
      })
      .addCase(updateProfileAction.fulfilled, (state, { payload }) => {
        state.settings = payload.data;
        state.loader = false;
      })
      .addCase(updateEmployeeEmailAction.fulfilled, (state, { payload }) => {
        state.settings = payload.data;
        state.loader = false;
        console.log(payload.data);
      })
      .addCase(updateEmployeePhoneAction.fulfilled, (state, { payload }) => {
        state.settings = payload.data;
        state.loader = false;
      })
      .addCase(updateEmployeeStatusAction.fulfilled, (state, { payload }) => {
        state.settings = payload.data;
        state.loader = false;
      })
      .addCase(updatePasswordAction.fulfilled, (state, { payload }) => {
        state.settings = payload.data;
        state.loader = false;
      });
  },
});
export const {} = settingSlice.actions;
export default settingSlice.reducer;
