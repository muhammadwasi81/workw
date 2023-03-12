import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addApproversAction } from "./action";

const initialState = {
  approver: {},
  addApproverLoader: false,
  success: false,
};

const ApproverSlice = createSlice({
  name: "ApproverSlice",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(addApproversAction.fulfilled, (state, action) => {
        state.approver = action.payload ? action.payload : [];
        state.addApproverLoader = false;
        state.success = true;
      })
      .addMatcher(isPending(...[addApproversAction]), (state) => {
        state.addApproverLoader = true;
        state.success = false;
      })
      .addMatcher(isRejected(...[addApproversAction]), (state) => {
        state.addApproverLoader = true;
        state.success = false;
      });
  },
});

export default ApproverSlice.reducer;
