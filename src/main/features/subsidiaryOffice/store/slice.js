import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode.js";
import { addBranchService } from "../../subsidiary/services/service.js";
import {
  addBranch,
  addBranchOffice,
  getAllBranchOffice,
  updateBranch,
} from "./actions.js";

const initialState = {
  items: [],
  loadingData: false,
  loader: false,
  success: false,
  error: false,
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
        console.log(payload, "addBranchOffice slice");
        state.loader = false;
        state.items.push(payload.data);
      })
      .addCase(updateBranch.fulfilled, (state, { payload }) => {
        console.log(payload, "updateBranch slice");
        state.loader = false;
        state.items = state.items.map((x) =>
          x.id === payload.data.id ? payload.data : x
        );
      })
      .addMatcher(isPending(...[addBranchOffice, updateBranch]), (state) => {
        state.loader = true;
        state.success = false;
        state.error = false;
      })
      .addMatcher(isPending(...[getAllBranchOffice]), (state) => {
        state.loadingData = true;
        state.success = false;
        state.error = false;
      })
      .addMatcher(
        isRejected(...[getAllBranchOffice, addBranchOffice, updateBranch]),
        (state) => {
          state.loader = false;
          state.loadingData = false;
          state.success = false;
          state.error = false;
        }
      );
  },
});

export const { BranchOfficeDeleted } = subsidiaryOfficeSlice.actions;
export default subsidiaryOfficeSlice.reducer;
