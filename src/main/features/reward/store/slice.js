import { createSlice } from "@reduxjs/toolkit";
import { addReward, getAllRewards } from "./actions";

const initialState = {
  rewards: [],
  loadingData: false,
  loader: false,
};

const rewardSlice = createSlice({
  name: "rewards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllRewards.fulfilled, (state, action) => {
      state.rewards = action.payload;
      console.log(action.payload, "rewards data");
    });

    builder.addCase(addReward.fulfilled, (state, { payload }) => {
      console.log(payload, "from reducer")
      state.rewardData = payload;
      return state;
    })


  },
});

export const {} = rewardSlice.actions;
export default rewardSlice.reducer;
