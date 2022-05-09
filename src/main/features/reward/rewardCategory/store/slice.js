import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../../services/enums/responseCode.js";
import {  getAllRewardCategory, addRewardCategory, updateRewardCategory } from "./actions.js";

const initialState = {
  rewardCategories: [],
  loadingData: false,
  loader: false,
};

const rewardCategorySlice = createSlice({
  name: "rewardCategory",
  initialState,
  reducers: {
    rewardCategoryDeleted: (state, { payload }) => {
      state.rewardCategories = state.rewardCategories.filter((e) => e.id !== payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRewardCategory.fulfilled, (state, { payload }) => {
        state.loadingData = false;
        state.rewardCategories = payload.data;
      })
      .addCase(addRewardCategory.fulfilled, (state, { payload }) => {
        state.loader = false;
        if (payload.responseCode === responseCode.Success)
          state.rewardCategories.push(payload.data);
      })
      .addCase(updateRewardCategory.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.rewardCategories = state.rewardCategories.map((x) =>
          x.id === payload.data.id ? payload.data : x
        );
      })
      .addMatcher(isPending(...[addRewardCategory, updateRewardCategory]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[getAllRewardCategory]), (state) => {
        state.loadingData = true;
      })
      .addMatcher(
        isRejected(...[getAllRewardCategory, addRewardCategory, updateRewardCategory]),
        (state) => {
          state.loader = false;
          state.loadingData = false;
        }
      );
  },
});

export const { rewardCategoryDeleted } = rewardCategorySlice.actions;
export default rewardCategorySlice.reducer;
