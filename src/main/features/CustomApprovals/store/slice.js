import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { getAllCustomApprovals } from "./actions";

const initialState = {
  customApprovals: [],
  loadingData: false,
  loader: true,
  rewardDetail: null,
};

const customApprovalSlice = createSlice({
  name: "customApprovals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCustomApprovals.fulfilled, (state, action) => {
      console.log(state, "HELLLOOO  From SLICE");
      state.customApprovals = action.payload ? action.payload : [];
      state.loader = false;
    });

    builder
      .addMatcher(isPending(...[getAllCustomApprovals]), (state) => {
        state.loader = true;
      })
      .addMatcher(isRejected(...[getAllCustomApprovals]), (state) => {
        state.loader = true;
      });
  },
});

export const {} = customApprovalSlice.actions;
export default customApprovalSlice.reducer;
