import { createSlice } from "@reduxjs/toolkit";

const newStickySlice = createSlice({
  name: "newStickyNote",
  initialState: {
    close: true,
    incrementArray: [],
    colorPicker: false,
  },
  reducers: {
    closeSticky(state) {
      state.close = false;
    },
    incrementStickyNote(state, actions) {
      const incrementStickyNote = actions.payload;
      state.incrementArray.push({
        id: incrementStickyNote.id,
        title: incrementStickyNote.title,
        textArea_placeholder: incrementStickyNote.textArea_placeholder,
        x_axis: incrementStickyNote.x_axis,
        y_axis: incrementStickyNote.y_axis,
      });
    },
    decrementStickyNote(state, actions) {
      const id = actions.payload;
      state.incrementArray = state.incrementArray.filter(
        (list) => list.id !== id
      );
    },
    stickyNoteColorPicker(state) {
      state.colorPicker = true;
    },
    closeStickyNoteColorPicker(state) {
      state.colorPicker = false;
    },
  },
});

export const {
  closeSticky,
  incrementStickyNote,
  decrementStickyNote,
  stickyNoteColorPicker,
  closeStickyNoteColorPicker,
} = newStickySlice.actions;

export default newStickySlice.reducer;
