import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addReward, getAllRewards, GetRewardById } from "./actions";

const initialState = {
  rewards: [],
  loadingData: false,
  loader: true,
  rewardDetail: {},
  drawerOpen: false
};

const rewardSlice = createSlice({
  name: "rewards",
  initialState,
  reducers: {
    handleOpenComposer: (state, { payload }) => {
      state.drawerOpen = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllRewards.fulfilled, (state, action) => {
      state.rewards = action.payload ? action.payload : [];
      state.loader = false;
    });

    builder.addCase(GetRewardById.fulfilled, (state, action) => {
      console.log("action.payload", action.payload);
      state.rewardDetail = action.payload.data;
    });

    builder
      .addCase(addReward.fulfilled, (state, { payload }) => {
        state.rewards = payload;
        console.log(state.drawerOpen)
        state.drawerOpen = false;
        return state;
      })
      .addMatcher(isPending(...[getAllRewards]), (state) => {
        state.loader = true;
      })
      .addMatcher(isRejected(...[getAllRewards]), (state) => {
        state.loader = true;
      });
  },
});

export const {handleOpenComposer} = rewardSlice.actions;
export default rewardSlice.reducer;
