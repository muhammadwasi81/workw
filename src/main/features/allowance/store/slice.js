import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode.js";
import { addAllowance, getAllAllowance, updateAllowance } from "./actions.js";

const initialState = {
  allowances: [],
  loadingData: false,
  loader: false,
  success: false,
  error: false,
};

const allowanceSlice = createSlice({
  name: "grade",
  initialState,
  reducers: {
    allowanceDeleted: (state, { payload }) => {
      state.allowances = state.allowances.filter((e) => e.id !== payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAllowance.fulfilled, (state, { payload }) => {
        state.loadingData = false;
        state.allowances = payload.data;
      })
      .addCase(addAllowance.fulfilled, (state, { payload }) => {
        state.loader = false;
        if (payload.responseCode === responseCode.Success)
          state.allowances.push(payload.data);
      })
      .addCase(updateAllowance.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.allowances = state.allowances.map((e) =>
          e.id === payload.data.id ? payload.data : e
        );
      })
      .addMatcher(isPending(...[addAllowance, updateAllowance]), (state) => {
        state.loader = true;
        state.success = false;
        state.error = false;
      })
      .addMatcher(isPending(...[getAllAllowance]), (state) => {
        state.loadingData = true;
        state.success = false;
        state.error = false;
      })
      .addMatcher(
        isRejected(...[getAllAllowance, addAllowance, updateAllowance]),
        (state) => {
          state.loader = false;
          state.loadingData = false;
          state.success = false;
          state.error = false;
        }
      );
  },
});

export const { allowanceDeleted } = allowanceSlice.actions;
export default allowanceSlice.reducer;
