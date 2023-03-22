import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../../services/enums/responseCode.js";
import {
  addPayrollGroup,
  getAllPayrollGroup,
  updateaPayrollGroup,
} from "./actions.js";

const initialState = {
  groups: [],
  loadingData: false,
  loader: false,
};

const playGroupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    PayrollGroupDeleted: (state, { payload }) => {
      state.groups = state.groups.filter((e) => e.id !== payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPayrollGroup.fulfilled, (state, { payload }) => {
        state.loadingData = false;

        state.groups = payload.data;
      })
      .addCase(addPayrollGroup.fulfilled, (state, { payload }) => {
        state.loader = false;
        if (payload.responseCode === responseCode.Success)
          state.groups.push(payload.data);
      })
      .addCase(updateaPayrollGroup.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.groups = state.groups.map((x) =>
          x.id === payload.data.id ? payload.data : x
        );
      })
      .addMatcher(
        isPending(...[addPayrollGroup, updateaPayrollGroup]),
        (state) => {
          state.loader = true;
        }
      )
      .addMatcher(isPending(...[getAllPayrollGroup]), (state) => {
        state.loadingData = true;
      })
      .addMatcher(
        isRejected(
          ...[getAllPayrollGroup, addPayrollGroup, updateaPayrollGroup]
        ),
        (state) => {
          state.loader = false;
          state.loadingData = false;
        }
      );
  },
});

export const { PayrollGroupDeleted } = playGroupSlice.actions;
export default playGroupSlice.reducer;
