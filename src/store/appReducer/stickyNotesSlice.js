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
    toggleStickyNotes(state) {
      state.open = !state.open;
    },
  },
});

export const {
  openStickyNotes,
  closeStickyNotes,
  toggleStickyNotes,
  addNewStickyNote,
} = stickyNotesSlice.actions;
export default stickyNotesSlice.reducer;
