import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode.js";
import { getAllPayment } from "./actions.js";

const initialState = {
  payment: [],
  loadingData: false,
  loader: false,
  success: false,
  error: false,
};

const userPaymentSlice = createSlice({
  name: "userPaymentSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPayment.fulfilled, (state, { payload }) => {
        console.log(payload, "get all payment data");
        state.loadingData = false;
        state.billing = payload.data;
      })
      .addMatcher(isPending(...[getAllPayment]), (state) => {
        state.loadingData = true;
        state.success = false;
        state.error = false;
      })
      .addMatcher(isRejected(...[getAllPayment]), (state) => {
        state.loadingData = false;
        state.success = false;
      });
  },
});

export const {} = userPaymentSlice.actions;
export default userPaymentSlice.reducer;
