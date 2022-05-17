import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addReward, getAllRewards, GetRewardById } from "./actions";

const initialState = {
  rewards: [],
  loadingData: false,
  loader: true,
  rewardDetail: {}
};

const rewardSlice = createSlice({
  name: "rewards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllRewards.fulfilled, (state, action) => {
      state.rewards = action.payload ? action.payload : [];
      state.loader = false;
    })

    builder.addCase(GetRewardById.fulfilled, (state, action) => {
      state.rewardDetail = action.payload;
    })

    builder.addCase(addReward.fulfilled, (state, { payload }) => {
      state.rewardData = payload;
      return state;
    })
    .addMatcher(isPending(...[getAllRewards]), (state) => {
      state.loader = true;
    })
    .addMatcher(
      isRejected(...[getAllRewards]),
      (state) => {
        state.loader = true;
      }
    );


  },
});

export const {} = rewardSlice.actions;
export default rewardSlice.reducer;
