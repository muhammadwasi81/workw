import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { getVerifyProjectExternalMember, setNewPassword } from "./action";

const initialState = {
  projectExternal: {},
  loader: false,
  isSuccess: false,
  verificationSuccess: false,
  verificationLoader: false,
  isError: false,
  successPassword: false,
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
          state.verificationLoader = false;
          let resCode = payload.responseCode;
          if (resCode === 1001) {
            state.isSuccess = true;
            state.verificationSuccess = true;
          } else {
            state.isSuccess = false;
            state.verificationSuccess = false;
          }
        }
      )
      .addCase(setNewPassword.fulfilled, (state, { payload }) => {
        let resCode = payload.responseCode;

        if (resCode === 1001) {
          state.successPassword = true;
        } else {
          state.successPassword = false;
        }
      })
      .addMatcher(isPending(...[setNewPassword]), (state) => {
        state.successPassword = false;
      })
      .addMatcher(isPending(...[getVerifyProjectExternalMember]), (state) => {
        state.verificationLoader = true;
      })
      .addMatcher(isRejected(...[getVerifyProjectExternalMember]), (state) => {
        state.isError = true;
        state.verificationLoader = false;
      })
      .addMatcher(isRejected(...[setNewPassword]), (state) => {
        state.successPassword = false;
      });
  },
});

export const {} = projectExternalSlice.actions;
export default projectExternalSlice.reducer;
