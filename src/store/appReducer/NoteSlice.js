import { createSlice } from "@reduxjs/toolkit";
//import NewStickyNote from "../../main/features/notes/NewStickyNote";

export const noteSlice = createSlice({
  name: "Notes",
  initialState: {
    open: false,
  },
  reducers: {
    toggleNotes(state) {
      state.open = !state.open;
    },
  },
});

export const { toggleNotes } = noteSlice.actions;
export default noteSlice.reducer;
