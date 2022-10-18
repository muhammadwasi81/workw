import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { getTeamsAction } from "./action";

const initialState = {
  teams: [],
  loader: false,
  success: false,
};

const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTeamsAction.fulfilled, (state, { payload }) => {
      state.teams = payload;
      state.loader = false;
      state.success = true;
      console.log(payload, "payload");
    });
  },
});
export default teamSlice.reducer;
export const {} = teamSlice.actions;
