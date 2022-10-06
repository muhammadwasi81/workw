import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode.js";
import { addBranchService } from "../../subsidiary/services/service.js";
import { addBranch, addBranchOffice, getAllBranchOffice, updateBranch } from "./actions.js";

const initialState = {
  items: [],
  loadingData: false,
  loader: false,
};

const subsidiaryOfficeSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    BranchOfficeDeleted: (state, { payload }) => {
      state.items = state.items.filter((e) => e.id !== payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBranchOffice.fulfilled, (state, { payload }) => {
        state.loadingData = false;
        state.items = payload.data;
      })
      .addCase(addBranchOffice.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.items.push(payload.data);
      })
      .addCase(updateBranch.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.items = state.items.map((x) =>
          x.id === payload.data.id ? payload.data : x
        );
      })
      .addMatcher(isPending(...[addBranchOffice, updateBranch]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[getAllBranchOffice]), (state) => {
        state.loadingData = true;
      })
      .addMatcher(
        isRejected(...[getAllBranchOffice, addBranchOffice, updateBranch]),
        (state) => {
          state.loader = false;
          state.loadingData = false;
        }
      );
  },
});

export const { BranchOfficeDeleted } = subsidiaryOfficeSlice.actions;
export default subsidiaryOfficeSlice.reducer;
