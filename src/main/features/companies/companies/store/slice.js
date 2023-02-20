import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  getCompanyAction,
  getRewardsAction,
  getAllLoanAction,
  getAllSignupAction,
  getCompanyByIdAction,
} from "./action";

const initialState = {
  signup: [],
  teams: [],
  companies: [],
  company: {
    basicInfo: {},
  },
  team: {
    rewardsdetails: [],
    loandetails: [],
  },
  loader: false,
  success: false,
};

const companySlice = createSlice({
  name: "comapnies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCompanyAction.fulfilled, (state, { payload }) => {
        state.companies = payload;
        state.loader = false;
        state.success = true;
      })
      .addCase(getCompanyByIdAction.fulfilled, (state, { payload }) => {
        state.company.basicInfo = payload;
      })
      .addCase(getRewardsAction.fulfilled, (state, { payload }) => {
        state.team.rewardsdetails = payload;
        state.loader = false;
        state.success = true;
      })
      .addCase(getAllLoanAction.fulfilled, (state, { payload }) => {
        state.team.loandetails = payload;
        state.loader = false;
        state.success = true;
      })
      .addCase(getAllSignupAction.fulfilled, (state, { payload }) => {
        state.signup = payload;
      })
      .addMatcher(isPending(getCompanyAction), (state) => {
        state.loader = true;
        state.success = false;
      })
      .addMatcher(isPending(getRewardsAction), (state) => {
        state.loader = true;
        state.success = false;
      })
      .addMatcher(isPending(getAllLoanAction), (state) => {
        state.loader = true;
        state.success = false;
      })
      .addMatcher(
        isRejected(...[getCompanyAction, getRewardsAction, getAllLoanAction]),
        (state) => {
          state.loader = false;
          state.success = false;
        }
      );
  },
});

export default companySlice.reducer;
