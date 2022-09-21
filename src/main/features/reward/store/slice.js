import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addReward, cancelReward, getAllRewards, GetRewardById } from "./actions";

const initialState = {
  success: false,
  rewards: [],
  loadingData: false,
  loader: true,
  rewardDetail: {},
  drawerOpen: false,
  cancelReward: {}
};

const rewardSlice = createSlice({
  name: "rewards",
  initialState,
  reducers: {
    handleOpenComposer: (state, { payload }) => {
      state.drawerOpen = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllRewards.fulfilled, (state, action) => {
      state.rewards = action.payload ? action.payload : [];
      state.loader = false;
    });

    builder.addCase(GetRewardById.fulfilled, (state, action) => {
      state.rewardDetail = action.payload.data;
    });

    builder.addCase(cancelReward.fulfilled, (state, action) => {
      state.cancelReward = action.payload.data;
    });

    builder
      .addCase(addReward.fulfilled, (state, { payload }) => {
        state.drawerOpen = false
        state.success = true
        state.rewards = [...state.rewards, payload.data.data];
      })
      .addMatcher(isPending(...[getAllRewards]), (state) => {
        state.loader = true;
      })
      .addMatcher(isRejected(...[getAllRewards]), (state) => {
        state.loader = true;
      });
  },
});

export const { handleOpenComposer } = rewardSlice.actions;
export default rewardSlice.reducer;
