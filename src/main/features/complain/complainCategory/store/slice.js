import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../../services/enums/responseCode.js";
import {
  addComplainCategory,
  getAllComplainCategory,
  updateComplainCategory,
} from "./actions.js";

const initialState = {
  complainCategories: [],
  loadingData: false,
  loader: false,
  success: false,
  error: false,
};

const complainCategorySlice = createSlice({
  name: "complainCategories",
  initialState,
  reducers: {
    ComplainCategoryDeleted: (state, { payload }) => {
      state.complainCategories = state.complainCategories.filter(
        (e) => e.id !== payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllComplainCategory.fulfilled, (state, { payload }) => {
        console.log(payload, "FROM SLICE");
        state.loadingData = false;
        state.complainCategories = payload.data;
      })
      .addCase(addComplainCategory.fulfilled, (state, { payload }) => {
        state.loader = false;
        if (payload.responseCode === responseCode.Success)
          state.complainCategories.push(payload.data);
      })
      .addCase(updateComplainCategory.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.complainCategories = state.complainCategories.map((x) =>
          x.id === payload.data.id ? payload.data : x
        );
      })
      .addMatcher(
        isPending(...[addComplainCategory, updateComplainCategory]),
        (state) => {
          state.loader = true;
          state.success = false;
          state.error = false;
        }
      )
      .addMatcher(isPending(...[getAllComplainCategory]), (state) => {
        state.loadingData = true;
        state.success = false;
        state.error = false;
      })
      .addMatcher(
        isRejected(
          ...[
            getAllComplainCategory,
            addComplainCategory,
            updateComplainCategory,
          ]
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

export const { ComplainCategoryDeleted } = complainCategorySlice.actions;
export default complainCategorySlice.reducer;
