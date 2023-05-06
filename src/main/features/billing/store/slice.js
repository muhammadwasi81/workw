import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode.js";
import { addBilling, getAllBilling, getAllPendingBills } from "./actions.js";

const initialState = {
  billing: [],
  loadingData: false,
  loader: false,
  success: false,
  error: false,

 PendingBillData:[],
 addBillingResponseMessage:""
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
      .addCase(getAllPendingBills.fulfilled, (state, { payload }) => {
        console.log(payload, "get all pending Bill data");
        state.PendingBillData = payload.data;
      })
      .addCase(addBilling.fulfilled, (state, { payload }) => {
        // console.log(payload, "get all pending Bill data");
        state.addBillingResponseMessage = payload.message;
      })
      .addMatcher(isPending(...[getAllBilling]), (state) => {
        state.loadingData = true;
        state.success = false;
        state.error = false;
      })
      .addMatcher(isRejected(...[getAllBilling]), (state) => {
        state.loadingData = false;
        state.success = false;
      })
  },
});

export const {} = userBillingSlice.actions;
export default userBillingSlice.reducer;
