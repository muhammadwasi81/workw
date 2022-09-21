import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode.js";
import { addBranch, getAllBranch, updateBranch } from "./actions.js";

const initialState = {
  items: [],
  loadingData: false,
  loader: false,
};

const subsidiarySlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    BranchDeleted: (state, { payload }) => {
      state.items = state.items.filter((e) => e.id !== payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBranch.fulfilled, (state, { payload }) => {
        state.loadingData = false;
        state.items = payload.data;
      })
      .addCase(addBranch.fulfilled, (state, { payload }) => {
        state.loader = false;
        if (payload.responseCode === responseCode.Success)
          state.items.push(payload.data);
      })
      .addCase(updateBranch.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.items = state.items.map((x) =>
          x.id === payload.data.id ? payload.data : x
        );
      })
      .addMatcher(isPending(...[addBranch, updateBranch]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[getAllBranch]), (state) => {
        state.loadingData = true;
      })
      .addMatcher(
        isRejected(...[getAllBranch, addBranch, updateBranch]),
        (state) => {
          state.loader = false;
          state.loadingData = false;
        }
      );
  },
});

export const { BranchDeleted } = subsidiarySlice.actions;
export default subsidiarySlice.reducer;
