import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { getVerifyProjectExternalMember, setNewPassword } from "./action";

const initialState = {
  projectExternal: {},
  loader: false,
  isSuccess: false,
  verificationSuccess: false,
  verificationLoader: false,
  isError: false,
};

export const projectExternalSlice = createSlice({
  name: "projectExternal",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(
        getVerifyProjectExternalMember.fulfilled,
        (state, { payload }) => {
          // state.projectExternal = payload;
          // state.verificationLoader = false;
          // let resCode = payload.responseCode;
          // if (resCode === 1001) {
          //   state.isSuccess = true;
          //   state.verificationSuccess = true;
          // } else {
          //   state.isSuccess = false;
          //   state.verificationSuccess = false;
          // }
          state.projectExternal = payload;
          state.isSuccess = true;
          state.verificationLoader = false;
        }
      )
      .addCase(setNewPassword.fulfilled, (state, { payload }) => {
        state.isSuccess = true;
      })
      .addMatcher(isPending(...[getVerifyProjectExternalMember]), (state) => {
        state.verificationLoader = true;
      })
      .addMatcher(isRejected(...[getVerifyProjectExternalMember]), (state) => {
        state.isError = true;
        state.verificationLoader = false;
      });
  },
});

export const {} = projectExternalSlice.actions;
export default projectExternalSlice.reducer;
