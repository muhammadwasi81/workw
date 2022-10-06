import { createSlice } from "@reduxjs/toolkit";

export const newStickySlice = createSlice({
  name: "newStickyNote",
  initialState: {
    open: false,
    close: true,
    incrementArray: [],
    listArray: [],
    colorPicker: true,
    bgColor: "",
    openImageSrc: "",
    openImg: false,
  },
  reducers: {
    closeSticky: (state) => {
      state.close = false;
    },
    toggleStickyNote: (state) => {
      state.open = !state.open;
      //console.log(state);
    },
    incrementStickyNote: (state, action) => {
      const incrementStickyNote = action.payload;
      state.incrementArray.push({
        id: incrementStickyNote.id,
        title: incrementStickyNote.title,
        textArea_placeholder: incrementStickyNote.textArea_placeholder,
        textArea_value: incrementStickyNote.textArea_value,
        x_axis: incrementStickyNote.x_axis,
        y_axis: incrementStickyNote.y_axis,
        bgColor: "",
        img: incrementStickyNote.img,
      });
      // state.close = true;
      state.listArray.push({
        id: incrementStickyNote.id,
        time: incrementStickyNote.notelistTime,
        title: incrementStickyNote.noteListTitle,
        text: incrementStickyNote.noteListText,
        bgColor: "",
        img: incrementStickyNote.img,
      });
    },
    decrementStickyNote: (state, action) => {
      const id = action.payload;
      state.incrementArray = state.incrementArray.filter(
        (list) => list.id !== id
      );
      state.listArray = state.listArray.filter((list) => list.id !== id);
    },
    closeStickyNote: (state, action) => {
      const id = action.payload;
      state.incrementArray = state.incrementArray.filter(
        (list) => list.id !== id
      );
    },
    openClickedStickyNote: (state, action) => {
      const listId = action.payload;

      // state.incrementArray.forEach((item) => console.log(item.id == listId.id));
      //const itemId = state.incrementArray.find((item) => item.id);
      let existNotes = state.incrementArray.map((item) => item.id);
      if (!existNotes.includes(listId.id)) {
        state.incrementArray.push({
          id: listId.id,
          title: listId.stickyNoteTitle,
          titleVal: listId.title,
          textArea_placeholder: listId.textArea_placeholder,
          textArea_value: listId.text,
          x_axis: listId.x_axis,
          y_axis: listId.y_axis,
          bgColor: listId.bgColor,
          img: listId.img,
        });
      }
    },
    stickyNoteColorPicker: (state, action) => {
      let id = action.payload;
      console.log(id);
    },
    closeStickyNoteColorPicker: (state) => {
      state.colorPicker = false;
    },
    openStickyNoteColorPicker: (state) => {
      state.colorPicker = true;
    },
    closeNote: (state) => {
      state.open = false;
      //console.log(state);
      state.incrementArray = state.incrementArray.filter(
        (list) => list.id === "abc"
      );
    },
    selectColor: (state, action) => {
      const color = action.payload;
      const stickyObject = state.incrementArray.find(
        (stickyNotes) => stickyNotes.id === color.id
      );
      stickyObject.bgColor = color.colorValue;
      const listObject = state.listArray.find((list) => list.id === color.id);
      listObject.bgColor = color.colorValue;
      //state.listArray[color.id].bgColor = color.colorValue;
      //state.bgColor = color;
    },
    deleteFromColorNoteNdList: (state, action) => {
      const id = action.payload;
      state.incrementArray = state.incrementArray.filter(
        (list) => list.id !== id
      );
      state.listArray = state.listArray.filter((list) => list.id !== id);
    },
    targetTitleVal: (state, action) => {
      const val = action.payload;
      //console.log(val);
      const listObj = state.listArray.find((list) => list.id === val.id);
      listObj.title = val.stickyTitle;
    },
    targetTextVal: (state, action) => {
      const val = action.payload;
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
    addImage: (state, action) => {
      const values = action.payload;
      const sticky = state.incrementArray.find((item) => item.id === values.id);
      const noteList = state.listArray.find((item) => item.id === values.id);
      sticky.img.push(values.abc);
      noteList.img.push(values.abc);
    },
    deleteImg: (state, action) => {
      const values = action.payload;
      const sticky = state.incrementArray.find((item) => item.id === values.id);
      const noteList = state.listArray.find((item) => item.id === values.id);

      sticky.img = sticky.img.filter((item) => item !== values.source);
      noteList.img = noteList.img.filter((item) => item !== values.source);
    },
    openFullImage: (state, action) => {
      const imgSrc = action.payload;
      state.openImageSrc = imgSrc;
      state.openImg = true;
    },
    closeFullImage: (state) => {
      state.openImg = false;
    },
    boldText: (state, action) => {
      const id = action.payload;
      //let selection = window.getSelection();
      //let boldText = <strong> {selection} </strong>;
      const selectSticky = state.incrementArray.find((item) => item.id === id);
      //selectSticky.textArea_value = ;
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
  openStickyNoteColorPicker,
  closeNote,
  selectColor,
  deleteFromColorNoteNdList,
  targetTitleVal,
  targetTextVal,
  addImage,
  deleteImg,
  openFullImage,
  closeFullImage,
  boldText,
} = newStickySlice.actions;

export default newStickySlice.reducer;
