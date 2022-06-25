import { createSlice } from "@reduxjs/toolkit";
//import NewStickyNote from "../../main/features/notes/NewStickyNote";

export const stickyNotesSlice = createSlice({
  name: "stickyNotes",
  initialState: {
    open: false,
  },
  reducers: {
    openStickyNotes: (state) => {
      state.open = true;
    },
    closeStickyNotes: (state) => {
      state.open = false;
    },
  },
});

export const { openStickyNotes, closeStickyNotes } = stickyNotesSlice.actions;
export default stickyNotesSlice.reducer;
