import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { setAuthEnv } from "../../../../utils/base";
import {
  addReward,
  cancelReward,
  getAllRewards,
  GetRewardById,
} from "./actions";

const initialState = {
  success: false,
  rewards: [],
  loadingData: false,
  loader: true,
  rewardDetail: {},
  drawerOpen: false,
  cancelReward: {},
};

const rewardSlice = createSlice({
  name: "rewards",
  initialState,
  reducers: {
    handleOpenComposer: (state, { payload }) => {
      state.drawerOpen = payload;
    },
    cancelRewardSuccess: (state, { payload }) => {
      let rewardList = [...state.rewards];
      let index = rewardList.findIndex((item) => item.id === payload.rewardId);
      let reward = rewardList.filter((item) => item.id === payload.rewardId)[0];

      rewardList[index] = {
        ...reward,
        status: 4,
      };

      state.rewards = rewardList;
      state.rewardDetail = {
        ...reward,
        status: 4,
      };
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

    // builder.addCase(cancelReward.fulfilled, (state, action) => {
    //   state.cancelReward = action.payload.data;
    // });

    builder
      .addCase(addReward.fulfilled, (state, { payload }) => {
        state.rewards = [payload.data.data, ...state.rewards];
        state.drawerOpen = false;
        return state;
      })
      .addMatcher(isPending(...[getAllRewards, addReward]), (state) => {
        state.loader = true;
      })
      .addMatcher(isRejected(...[getAllRewards]), (state) => {
        state.loader = true;
      });
  },
});

export const { handleOpenComposer, cancelRewardSuccess } = rewardSlice.actions;
export default rewardSlice.reducer;
