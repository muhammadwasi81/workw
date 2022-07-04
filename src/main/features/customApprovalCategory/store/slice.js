import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode.js";
import { addCustomApprovalCategory, getAllCustomApprovalCategory, removeCustomApprovalCategory, updateCustomApprovalCategory } from "./actions.js";

const initialState = {
  customApprovalCategories: [],
  loadingData: false,
  loader: false,
};

const customApprovalCategorySlice = createSlice({
  name: "customApprovalCategory",
  initialState,
  reducers: {
    customApprovalCategoryDeleted: (state, { payload }) => {
      state.customApprovalCategories = state.customApprovalCategories.filter((e) => e.id !== payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCustomApprovalCategory.fulfilled, (state, { payload }) => {
        state.loadingData = false;
        state.customApprovalCategories = payload;
      })
      .addCase(addCustomApprovalCategory.fulfilled, (state, { payload }) => {
        state.loader = false;
        if (payload.responseCode === responseCode.Success) state.customApprovalCategories.push(payload.data);
      })
      .addCase(updateCustomApprovalCategory.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.customApprovalCategories = state.customApprovalCategories.map((x) => (x.id === payload.data.id ? payload.data : x));
      })
      .addMatcher(isPending(...[addCustomApprovalCategory, updateCustomApprovalCategory]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[getAllCustomApprovalCategory]), (state) => {
        state.loadingData = true;
      })
      .addMatcher(isRejected(...[getAllCustomApprovalCategory, addCustomApprovalCategory, updateCustomApprovalCategory]), (state) => {
        state.loader = false;
        state.loadingData = false;
      });
  },
});

export const { customApprovalCategoryDeleted } = customApprovalCategorySlice.actions;
export default customApprovalCategorySlice.reducer;
