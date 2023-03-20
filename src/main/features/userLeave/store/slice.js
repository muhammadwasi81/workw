import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { getUserLeave, addLeaveByEmployee } from "./actions";

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
        console.log(action.payload, "action paylod");
        state.allLeaves = action.payload.data;
        state.loader = false;
      })
      .addCase(addLeaveByEmployee.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.allLeaves.push(payload.data);
      })
      .addMatcher(isPending(...[getUserLeave]), (state) => {
        state.loader = true;
      })
      .addMatcher(isRejected(...[getUserLeave]), (state) => {
        state.loader = false;
      });
  },
});
// export const { setmodal, closeModal } = externalBookAppointment.actions;

export default userLeaveSlice.reducer;
