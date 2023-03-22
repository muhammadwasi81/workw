import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode.js";
import { getAllBilling } from "./actions.js";

const initialState = {
  billing: [],
  loadingData: false,
  loader: false,
  success: false,
  error: false,
};

const userBillingSlice = createSlice({
  name: "userBillingSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBilling.fulfilled, (state, { payload }) => {
        console.log(payload, "get all billing data");
        state.loadingData = false;
        state.billing = payload.data;
      })
      .addMatcher(isPending(...[getAllBilling]), (state) => {
        state.loadingData = true;
        state.success = false;
        state.error = false;
      })
      .addMatcher(isRejected(...[getAllBilling]), (state) => {
        state.loadingData = false;
        state.success = false;
      });
  },
});

export const {} = userBillingSlice.actions;
export default userBillingSlice.reducer;
