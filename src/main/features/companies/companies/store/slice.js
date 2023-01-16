import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import { getTeamsAction, getRewardsAction, getAllLoanAction } from './action';

const initialState = {
  teams: [],
  team: {
    rewardsdetails: [],
    loandetails: [],
  },
  loader: false,
  success: false,
};

const teamSlice = createSlice({
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

export default teamSlice.reducer;
