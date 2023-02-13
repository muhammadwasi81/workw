import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import { getTeamsAction, getRewardsAction, getAllLoanAction,getAllSignupAction } from './action';

const initialState = {
  signup:[],
  teams: [],
  team: {
    rewardsdetails: [],
    loandetails: [],
  },
  loader: false,
  success: false,
};

const companySlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTeamsAction.fulfilled, (state, { payload }) => {
        state.teams = payload;
        state.loader = false;
        state.success = true;
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
      .addMatcher(isPending(getTeamsAction), (state) => {
        console.log('pending teams');
        state.loader = true;
        state.success = false;
      })
      .addMatcher(isPending(getRewardsAction), (state) => {
        console.log('pending teams');
        state.loader = true;
        state.success = false;
      })
      .addMatcher(isPending(getAllLoanAction), (state) => {
        console.log('pending teams');
        state.loader = true;
        state.success = false;
      })
      .addMatcher(
        isRejected(...[getTeamsAction, getRewardsAction, getAllLoanAction]),
        (state) => {
          console.log('rejected');
          state.loader = false;
          state.success = false;
        }
      );
  },
});

export default companySlice.reducer;
