import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  addLeave,
  getAllLeaves,
  GetLeaveById,
  GetLeaveTypeAction,
} from "./actions";

const initialState = {
  leaves: [],
  loadingData: false,
  loader: true,
  leaveDetail: {},
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
    builder.addCase(getAllLeaves.fulfilled, (state, action) => {
      state.leaves = action.payload ? action.payload : [];
      console.log(action.payload, "payloadddd");
      state.loader = false;
    });

    builder.addCase(GetLeaveById.fulfilled, (state, action) => {
      state.leaveDetail = action.payload.data;
      state.loadingData = false;
    });
    builder.addCase(GetLeaveTypeAction.fulfilled, (state, action) => {
      console.log(action.payload, "sliceeeee");
      state.UserLeave = action.payload.data;
      state.loadingData = false;
    });

    builder
      .addCase(addLeave.fulfilled, (state, { payload }) => {
        console.log(payload, "payload");
        console.log(state.leaves, "leaves");
        // state.drawerOpen = false;
        // state.leaveData = payload;
        // return state;
        // state.leaves = [payload.data.data, ...state.leaves];
        state.leaves.unshift(payload.data.data);

        state.drawerOpen = false;

        return state;
      })
      .addMatcher(isPending(...[getAllLeaves]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[GetLeaveById]), (state) => {
        state.loadingData = true;
      })
      .addMatcher(isRejected(...[getAllLeaves]), (state) => {
        state.loader = true;
      });
  },
});

export const { handleOpenComposer } = leaveSlice.actions;
export default leaveSlice.reducer;
