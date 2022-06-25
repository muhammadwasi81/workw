import { createSlice } from "@reduxjs/toolkit";

const newStickySlice = createSlice({
  name: "newStickyNote",
  initialState: {
    open: false,
    close: true,
    incrementArray: [],
    listArray: [],
    colorPicker: false,
    bgColor: "",
  },
  reducers: {
    closeSticky: (state) => {
      state.close = false;
    },
    toggleStickyNote: (state) => {
      state.open = !state.open;
      //console.log(state);
    },
    incrementStickyNote: (state, actions) => {
      const incrementStickyNote = actions.payload;
      state.incrementArray.push({
        id: incrementStickyNote.id,
        title: incrementStickyNote.title,
        textArea_placeholder: incrementStickyNote.textArea_placeholder,
        textArea_value: incrementStickyNote.textArea_value,
        x_axis: incrementStickyNote.x_axis,
        y_axis: incrementStickyNote.y_axis,
        bgColor: "",
      });
      // state.close = true;
      state.listArray.push({
        id: incrementStickyNote.id,
        time: incrementStickyNote.notelistTime,
        title: incrementStickyNote.noteListTitle,
        text: incrementStickyNote.noteListText,
        bgColor: "",
      });
    },
    decrementStickyNote: (state, actions) => {
      const id = actions.payload;
      state.incrementArray = state.incrementArray.filter(
        (list) => list.id !== id
      );
      state.listArray = state.listArray.filter((list) => list.id !== id);
    },
    closeStickyNote: (state, actions) => {
      const id = actions.payload;
      state.incrementArray = state.incrementArray.filter(
        (list) => list.id !== id
      );
    },
    openClickedStickyNote: (state, actions) => {
      const listId = actions.payload;
      state.incrementArray.push({
        id: listId.id,
        title: listId.stickyNoteTitle,
        titleVal: listId.title,
        textArea_placeholder: listId.textArea_placeholder,
        textArea_value: listId.text,
        x_axis: listId.x_axis,
        y_axis: listId.y_axis,
        bgColor: listId.bgColor,
      });
    },
    stickyNoteColorPicker: (state, actions) => {
      let id = actions.payload;
      console.log(id);
    },
    closeStickyNoteColorPicker: (state) => {
      state.colorPicker = false;
    },
    closeNote: (state) => {
      state.open = false;
      //console.log(state);
      state.incrementArray = state.incrementArray.filter(
        (list) => list.id === "abc"
      );
    },
    selectColor: (state, actions) => {
      const color = actions.payload;
      const stickyObject = state.incrementArray.find(
        (stickyNotes) => stickyNotes.id === color.id
      );
      stickyObject.bgColor = color.colorValue;
      const listObject = state.listArray.find((list) => list.id === color.id);
      listObject.bgColor = color.colorValue;
      //state.listArray[color.id].bgColor = color.colorValue;
      //state.bgColor = color;
    },
    deleteFromColorNoteNdList: (state, actions) => {
      const id = actions.payload;
      state.incrementArray = state.incrementArray.filter(
        (list) => list.id !== id
      );
      state.listArray = state.listArray.filter((list) => list.id !== id);
    },
    targetTitleVal: (state, actions) => {
      const val = actions.payload;
      //console.log(val);
      const listObj = state.listArray.find((list) => list.id === val.id);
      listObj.title = val.stickyTitle;
    },
    targetTextVal: (state, actions) => {
      const val = actions.payload;
      const listObj = state.listArray.find((list) => list.id === val.id);
      const stickyObj = state.incrementArray.find(
        (notes) => notes.id === val.id
      );
      const listText =
        val.stickyText === ""
          ? (listObj.text = "Take a Note...")
          : val.stickyText;
      listObj.text = listText;
      stickyObj.textArea_value = val.stickyText;
    },
  },
});

export const {
  closeSticky,
  toggleStickyNote,
  incrementStickyNote,
  decrementStickyNote,
  closeStickyNote,
  openClickedStickyNote,
  stickyNoteColorPicker,
  closeStickyNoteColorPicker,
  closeNote,
  selectColor,
  deleteFromColorNoteNdList,
  targetTitleVal,
  targetTextVal,
} = newStickySlice.actions;

export default newStickySlice.reducer;
