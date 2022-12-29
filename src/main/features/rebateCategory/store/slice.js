import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode.js";
import {
  addRebateCategory,
  getAllRebateCategories,
  updateRebateCategory,
} from "./actions.js";

const initialState = {
  rebateCategories: [],
  loadingData: false,
  loader: false,
  success: false,
  error: false,
};

const rebateCategorySlice = createSlice({
  name: "rebateCategory",
  initialState,
  reducers: {
    rebateDeleted: (state, { payload }) => {
      state.rebateCategories = state.rebateCategories.filter(
        (e) => e.id !== payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRebateCategories.fulfilled, (state, { payload }) => {
        state.loadingData = false;
        state.rebateCategories = payload.data;
      })
      .addCase(addRebateCategory.fulfilled, (state, { payload }) => {
        state.loader = false;
        if (payload.responseCode === responseCode.Success)
          state.rebateCategories.push(payload.data);
      })
      .addCase(updateRebateCategory.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.rebateCategories = state.rebateCategories.map((x) =>
          x.id === payload.data.id ? payload.data : x
        );
      })
      .addMatcher(
        isPending(...[addRebateCategory, updateRebateCategory]),
        (state) => {
          state.loader = true;
          state.success = false;
          state.error = false;
        }
      )
      .addMatcher(isPending(...[getAllRebateCategories]), (state) => {
        state.loadingData = true;
        state.success = false;
        state.error = false;
      })
      .addMatcher(
        isRejected(
          ...[getAllRebateCategories, addRebateCategory, updateRebateCategory]
        ),
        (state) => {
          state.loader = false;
          state.loadingData = false;
          state.success = false;
          state.error = false;
        }
      );
  },
});

export const { rebateCategoryDeleted } = rebateCategorySlice.actions;
export default rebateCategorySlice.reducer;
