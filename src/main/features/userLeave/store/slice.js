import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { getUserLeave, updateUserLeave } from "./actions";

const initialState = {
  allLeaves: [],
  loadingData: false,
  loader: false,
  modal: false,
};

const userLeaveSlice = createSlice({
  name: "userLeaveSlice",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getUserLeave.fulfilled, (state, action) => {
        state.allLeaves = action.payload.data;
        state.loader = false;
      })
      .addCase(updateUserLeave.fulfilled, (state, action) => {
        state.loader = false;
        state.allLeaves = action.payload.data;
      })

      .addMatcher(isPending(...[getUserLeave]), (state) => {
        state.loader = true;
      })
      .addMatcher(isRejected(...[getUserLeave]), (state) => {
        state.loader = false;
      });
  },
});

export default userLeaveSlice.reducer;
