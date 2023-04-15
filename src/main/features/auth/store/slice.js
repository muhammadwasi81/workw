import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  loginUser,
  signup,
  verification,
  getDesignation,
  setNewPassword,
  forgotPasswordVerification,
} from "./actions.js";

const initialState = {
  data: {},
  designations: [],
  loader: false,
  isSuccess: false,
  verificationSuccess: false,
  verificationLoader: false,
  token: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearState: (state, payload) => {
      state.isSuccess = false;
      state.isError = false;
      state.data = {};
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.loader = false;
        state.isSuccess = true;
        return state;
      })

      .addCase(getDesignation.fulfilled, (state, { payload }) => {
        state.designations = payload;
        state.loader = false;
        return state;
      })
      // .addCase(uploadImage.fulfilled, (state, { payload }) => {
      //   state.uploadImage = false;
      // })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.signupData = payload;
        state.loader = false;
        state.isSuccess = true;
        return state;
      })

      .addCase(forgotPasswordVerification.fulfilled, (state, action) => {
        state.loader = false;
        state.token = action.payload;
      })

      // .addCase(verification.pending, (state, { payload }) => {
      //   console.log(payload, "verification.pending");
      // })
      .addCase(verification.fulfilled, (state, { payload }) => {
        state.verificationLoader = false;
        let resCode = payload.responseCode;
        if (resCode === 1001) {
          state.isSuccess = true;
          state.verificationSuccess = true;
        } else {
          state.isSuccess = false;
          state.verificationSuccess = false;
        }
      })
      // .addCase(setNewPassword.fulfilled, (state, { payload }) => {
      //   let resCode = payload.responseCode;
      //   if (resCode === 1001) {
      //       console.log("Success")
      //   }
      //   console.log(resCode, "MY PAYLOAD")
      // })
      .addCase(verification.rejected, (state, { payload }) => {
        state.isError = true;
        state.verificationLoader = false;
        // state.verificationSuccess = false;
      })

      .addMatcher(isPending(...[loginUser, signup]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[verification]), (state) => {
        state.verificationLoader = true;
      })

      .addMatcher(isRejected(...[loginUser, signup]), (state, { payload }) => {
        state.isError = true;
        state.loader = false;
        state.loadingData = false;
      });
  },
});

export const { clearState } = authSlice.actions;
export default authSlice.reducer;
