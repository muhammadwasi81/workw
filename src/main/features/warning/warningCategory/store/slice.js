import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../../services/enums/responseCode.js";
import {
  addWarningCategory,
  getAllWarningCategories,
  removeWarningCategory,
  updateWarningCategory,
} from "./actions.js";

const initialState = {
  warningCategories: [],
  loadingData: false,
  loader: false,
  success: false,
  error: false,
};

const warningCategorySlice = createSlice({
  name: "warningCategory",
  initialState,
  reducers: {
    warningCategoryDeleted: (state, { payload }) => {
      state.warningCategories = state.warningCategories.filter(
        (e) => e.id !== payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllWarningCategories.fulfilled, (state, { payload }) => {
        state.loadingData = false;
        state.warningCategories = payload.data;
      })
      .addCase(addWarningCategory.fulfilled, (state, { payload }) => {
        state.loader = false;
        if (payload.responseCode === responseCode.Success)
          state.warningCategories.push(payload.data);
      })
      .addCase(updateWarningCategory.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.warningCategories = state.warningCategories.map((x) =>
          x.id === payload.data.id ? payload.data : x
        );
      })
      .addMatcher(
        isPending(...[addWarningCategory, updateWarningCategory]),
        (state) => {
          state.loader = true;
          state.success = false;
          state.error = false;
        }
      )
      .addMatcher(isPending(...[getAllWarningCategories]), (state) => {
        state.loadingData = true;
        state.success = false;
        state.error = false;
      })
      .addMatcher(
        isRejected(
          ...[
            getAllWarningCategories,
            addWarningCategory,
            updateWarningCategory,
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

export const { warningCategoryDeleted } = warningCategorySlice.actions;
export default warningCategorySlice.reducer;
