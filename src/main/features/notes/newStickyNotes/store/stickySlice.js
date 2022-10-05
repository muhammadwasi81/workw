import { createSlice, isPending, isRejected, current } from "@reduxjs/toolkit";
import { createGuid, STRINGS } from "../../../../../utils/base";
import {
  addSticky,
  deleteStickyAction,
  getAllStickyNotesAction,
  getColorCodeAction,
  getStickyNoteTitleAction,
  getStickyNoteDescAction,
} from "./actions";

const defaultSticky = {
  id: 1,
  title: "",
  description: "",
  privacyId: "",
  isOpen: false,
  colorCode: "",
  // search:"",
};

export const stickySlice = createSlice({
  name: "StickNoteSlice",
  initialState: {
    open: false,
    listArray: [],
    incrementNotes: [],
    colorPicker: true,
    bgColor: "",
    openImageSrc: "",
  },
  reducers: {
    closeSticky: (state) => {
      state.open = false;
    },
    closeStickyNote: (state, action) => {
      let selectedId = action.payload;
      let currentIndex = state.listArray.findIndex(
        (it) => it.id === selectedId
      );
      console.log(currentIndex, "currentIndex", selectedId);
      state.listArray[currentIndex].isOpen = false;
    },

    addStickyNote: (state) => {
      state.listArray = [
        ...state.listArray,
        {
          ...defaultSticky,
        },
      ];
    },
    toggleStickyNote: (state) => {
      state.open = !state.open;
    },
    showStickyNote: (state, action) => {
      let selectedId = action.payload;
      let currentIndex = state.listArray.findIndex(
        (it) => it.id === selectedId
      );
      // console.log(currentIndex, "currentIndex", selectedId);
      state.listArray[currentIndex].isOpen = true;
    },
    handleChangeNote: (state, action) => {
      let updatedNote = action.payload;
      let currentIndex = state.listArray.findIndex(
        (it) => it.id === updatedNote.id
      );
      console.log("current index", currentIndex);
      state.listArray[currentIndex] = updatedNote;
    },
    deleteStickyNote: (state, action) => {
      const id = action.payload.id;
      state.listArray = state.listArray.filter((list) => list.id !== id);
    },
    addImage: (state, action) => {
      const values = action.payload;
      const sticky = state.listArray.find((item) => item.id === values.id);
      // const noteList = state.listArray.find((item) => item.id === values.id);
      sticky.img.push(values.imag);
      // console.img.log("STICKY",sticky);
      // noteList.push(values.img);
    },

    // ********color picker********

    selectStickyNoteColor: (state, action) => {
      const color = action.payload;
      const stickyObject = state.listArray.find(
        (stickyNotes) => stickyNotes.id === color.id
      );
      stickyObject.colorCode = color.colorValue;

      // const listObject = state.listArray.find((list) => list.id === color.id);
      // listObject.bgColor = color.colorValue;
    },

    targetTitleVal: (state, action) => {
      const val = action.payload;
      console.log("valueee", val);
      const listObj = state.listArray.find((list) => list.id === val.id);
      listObj.title = val.stickyTitle;
    },
    targetStickyDescription: (state, action) => {
      const val = action.payload;
      const listObj = state.listArray.find((list) => list.id === val.id);
      // state.listArray[index].description = val.stickyText 
      listObj.description = val.stickyText
      // console.log(current(listObj));
     
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addSticky.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.loader = false;
        state.success = true;
        state.listArray = [...state.listArray, payload];
      })
      .addCase(deleteStickyAction.fulfilled, (state) => {
        state.loader = false;
        state.success = true;
      })
      .addCase(getAllStickyNotesAction.fulfilled, (state, action) => {
        state.listArray = action.payload;
      })
      .addCase(getColorCodeAction.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.success = true;
        // state.listArray=action.payload;
        state.listArray = [...state.listArray, payload];
        // console.log(state, "COLOR STATE");
      })
      .addCase(getStickyNoteTitleAction.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.success = true;
        // state.listArray=action.payload;
        state.listArray = [...state.listArray, payload];
        // console.log(state, "title STATE");
      })

      .addCase(getStickyNoteDescAction.fulfilled, (state, { payload }) => {
        // state.loader = false;
        // state.success = true;
        // state.listArray=action.payload;
        // state.listArray = [...state.listArray, payload];
        // console.log(state, "DEsc STATE");
      })
      
  },
});

export const {
  closeSticky,
  addStickyNote,
  toggleStickyNote,
  showStickyNote,
  handleChangeNote,
  closeStickyNote,
  deleteStickyNote,
  selectStickyNoteColor,
  targetTitleVal,
  targetStickyDescription,
  addImage,
} = stickySlice.actions;
export default stickySlice.reducer;
