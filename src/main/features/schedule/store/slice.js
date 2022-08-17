import { createSlice } from "@reduxjs/toolkit";

const scheduleSlice = createSlice({
  name: "schedule",
  initialState: {
    eventDetailComposer: false,
  },
  reducers: {
    toggleEventDetailComposer: (state, _) => {
      state.eventDetailComposer = !state.eventDetailComposer;
    },
  },
});

export default scheduleSlice.reducer;
export const { toggleEventDetailComposer } = scheduleSlice.actions;
