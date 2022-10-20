import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  getTeamsAction,
  getRewardsAction,
  getAllLoanAction,
  getAllComplainAction,
  getAllWarningAction,
} from "./action";

const initialState = {
  teams: [],
  team: {
    rewardsdetails: [],
    loandetails: [],
    complaindetails: [],
    warningdetails: [],
  },
  loader: false,
  success: false,
};

const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTeamsAction.fulfilled, (state, { payload }) => {
        state.teams = payload;
        state.loader = false;
        state.success = true;
        // console.log(payload, "payload");
      })
      .addCase(getRewardsAction.fulfilled, (state, { payload }) => {
        state.team.rewardsdetails = payload;
        state.loader = false;
        state.success = true;
        // console.log(payload, "REWARDS");
      })
      .addCase(getAllLoanAction.fulfilled, (state, { payload }) => {
        state.team.loandetails = payload;
        state.loader = false;
        state.success = true;
        console.log(payload, "Loan");
      })
      .addCase(getAllComplainAction.fulfilled, (state, { payload }) => {
        state.team.complaindetails = payload;
        state.loader = false;
        state.success = true;
        console.log(payload, "Complain");
      })
      .addCase(getAllWarningAction.fulfilled, (state, { payload }) => {
        state.team.warningdetails = payload;
        state.loader = false;
        state.success = true;
        console.log(payload, "warning");
      });
  },
});
export default teamSlice.reducer;
export const {} = teamSlice.actions;
