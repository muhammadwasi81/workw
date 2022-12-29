import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../../services/enums/responseCode.js";
import {
  addLeaveType,
  getAllLeaveType,
  removeLeaveType,
  updateLeaveType,
} from "./actions.js";

const initialState = {
  leaveTypes: [],
  loadingData: false,
  loader: false,
  success: false,
  error: false,
};

const leaveTypeSlice = createSlice({
  name: "leaveTypes",
  initialState,
  reducers: {
    leaveTypeDeleted: (state, { payload }) => {
      state.leaveTypes = state.leaveTypes.filter((e) => e.id !== payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllLeaveType.fulfilled, (state, { payload }) => {
        state.loadingData = false;
        state.leaveTypes = payload.data;
      })
      .addCase(addLeaveType.fulfilled, (state, { payload }) => {
        state.loader = false;
        if (payload.responseCode === responseCode.Success)
          state.leaveTypes.push(payload.data);
      })
      .addCase(updateLeaveType.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.leaveTypes = state.leaveTypes.map((x) =>
          x.id === payload.data.id ? payload.data : x
        );
      })
      .addMatcher(isPending(...[addLeaveType, updateLeaveType]), (state) => {
        state.loader = true;
        state.success = false;
        state.error = false;
      })
      .addMatcher(isPending(...[getAllLeaveType]), (state) => {
        state.loadingData = true;
        state.success = false;
        state.error = false;
      })
      .addMatcher(
        isRejected(...[getAllLeaveType, addLeaveType, updateLeaveType]),
        (state) => {
          state.loader = false;
          state.loadingData = false;
          state.success = false;
          state.error = false;
        }
      );
  },
});

export const { leaveTypeDeleted } = leaveTypeSlice.actions;
export default leaveTypeSlice.reducer;
