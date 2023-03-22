import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  getTeamsAction,
  getRewardsAction,
  getCourseAction,
  getAllLoanAction,
  getAllComplainAction,
  getAllWarningAction,
  getAllLeaveAction,
  getAllCheckInAction,
  getAppraisalsAction,
  getDeviceInfoAction,
  addTeamMemberAction,
} from "./action";

const initialState = {
  teams: [],
  team: {
    rewardsdetails: [],
    coursedetails: [],
    loandetails: [],
    appraisalsdetails: [],
    complaindetails: [],
    warningdetails: [],
    leavedetails: [],
    checkIndetails: [],
    devicedetails: [],
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
      .addCase(addTeamMemberAction.fulfilled, (state, { payload }) => {
        state.teams = [...state.teams, payload];
        state.loader = false;
        state.success = true;
      })
      .addCase(getDeviceInfoAction.fulfilled, (state, { payload }) => {
        state.team.devicedetails = payload;
        state.loader = false;
        state.success = true;
      })
      .addCase(getRewardsAction.fulfilled, (state, { payload }) => {
        state.team.rewardsdetails = payload;
        state.loader = false;
        state.success = true;
      })
      .addCase(getCourseAction.fulfilled, (state, { payload }) => {
        state.team.coursedetails = payload;
        state.loader = false;
        state.success = true;
      })
      .addCase(getAppraisalsAction.fulfilled, (state, { payload }) => {
        state.team.appraisalsdetails = payload;
        state.loader = false;
        state.success = true;
        console.log(payload, "appraisalsdetailsssss");
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
      })
      .addCase(getAllLeaveAction.fulfilled, (state, { payload }) => {
        state.team.leavedetails = payload;
        state.loader = false;
        state.success = true;
        console.log(payload, "leavessss");
      })
      .addCase(getAllCheckInAction.fulfilled, (state, { payload }) => {
        state.team.checkIndetails = payload;
        state.loader = false;
        state.success = true;
        console.log(payload, "CheckIn");
      })
      .addMatcher(isPending(...[addTeamMemberAction]), (state) => {
        console.log("pending adding state");
        state.loader = true;
      })
      .addMatcher(isRejected(...[addTeamMemberAction]), (state) => {
        console.log("rejected adding state");
        state.loader = false;
      });
  },
});
export default teamSlice.reducer;
// export const {} = teamSlice.actions;
