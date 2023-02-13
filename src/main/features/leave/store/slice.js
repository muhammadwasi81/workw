import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  addLeave,
  getAllLeaves,
  GetLeaveById,
  GetLeaveTypeAction,
  GetLeaveUserById,
} from "./actions";

const initialState = {
  leaves: [],
  loadingData: false,
  loader: true,
  leaveDetail: {},
  createLoader: false,
  drawerOpen: false,
  success: false,
  UserLeave: [],
};

const leaveSlice = createSlice({
  name: "leaves",
  initialState,
  reducers: {
    handleOpenComposer: (state, { payload }) => {
      state.drawerOpen = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllLeaves.fulfilled, (state, action) => {
        state.leaves = action.payload ? action.payload : [];
        state.loader = false;
      })
      .addCase(GetLeaveUserById.fulfilled, (state, { payload }) => {
        state.leaves = payload.data ? payload.data : [];
        state.loader = false;
      })
      .addCase(GetLeaveById.fulfilled, (state, action) => {
        state.leaveDetail = action.payload.data;
        state.loadingData = false;
      })
      .addCase(GetLeaveTypeAction.fulfilled, (state, action) => {
        state.UserLeave = action.payload.data;
        state.loadingData = false;
      })
      .addCase(addLeave.fulfilled, (state, { payload }) => {
        // state.drawerOpen = false;
        // state.leaveData = payload;
        // return state;
        // state.leaves = [payload.data.data, ...state.leaves];
        state.leaves.unshift(payload.data.data);
        state.drawerOpen = false;
        state.createLoader = false;
        return state;
      })
      .addMatcher(isPending(...[getAllLeaves]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[GetLeaveUserById]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[addLeave]), (state) => {
        state.createLoader = false;
      })
      .addMatcher(isPending(...[GetLeaveById]), (state) => {
        state.loadingData = true;
      })
      .addMatcher(isRejected(...[getAllLeaves]), (state) => {
        state.loader = true;
      })
      .addMatcher(isRejected(...[addLeave]), (state) => {
        state.createLoader = false;
      })
      .addMatcher(isRejected(...[GetLeaveUserById]), (state) => {
        state.loader = false;
      });
  },
});

export const { handleOpenComposer } = leaveSlice.actions;
export default leaveSlice.reducer;
