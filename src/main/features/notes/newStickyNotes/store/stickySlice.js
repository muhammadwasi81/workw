import { createSlice,isPending, isRejected } from "@reduxjs/toolkit";
import { createGuid,STRINGS } from "../../../../../utils/base";
import { addSticky } from "./actions";

const defaultSticky = {
 
  title: "Test Title here",
  description: "Description here",
  privacyId: "",
  isOpen: false,
};

export const stickySlice = createSlice({
  name: "StickNoteSlice",
  initialState: {
    open: false,
    listArray: [],
    incrementNotes: [],
    colorPicker: true,
    bgColor: "",

  },
  reducers: {
    closeSticky: (state) => {
      state.open = false;
    },
    closeStickyNote:(state,action)=>{
      let selectedId = action.payload;
      let currentIndex = state.listArray.findIndex(it => it.id === selectedId);
      console.log(currentIndex, "currentIndex", selectedId);
      state.listArray[currentIndex].isOpen = false;
    },
   
    addStickyNote: (state) => {
      state.listArray = [
        ...state.listArray,
        {
          id: createGuid(),
          ...defaultSticky
        }
      ];
    },
    toggleStickyNote: (state) => {
      state.open = !state.open;
    },
    showStickyNote: (state, action) => {
      let selectedId = action.payload;
      let currentIndex = state.listArray.findIndex(it => it.id === selectedId);
      console.log(currentIndex, "currentIndex", selectedId);
      state.listArray[currentIndex].isOpen = true;
    },
    handleChangeNote: (state, action) => {
      let updatedNote = action.payload;
      let currentIndex = state.listArray.findIndex(it => it.id === updatedNote.id);
      console.log("current index",currentIndex);
      state.listArray[currentIndex] = updatedNote;
    },
    deleteStickyNote:(state,action)=>{
      const id = action.payload;
     state.listArray = state.listArray.filter(
       (list) => list.id !== id);
   },

   // ********color picker********
  //  openColorPicker:(state)=>{
  //   state.colorPicker = true;
  //  },
   selectStickyNoteColor:(state,action)=>{
    const color = action.payload;
      const stickyObject = state.listArray.find(
        (stickyNotes) => stickyNotes.id === color.id
      );
      stickyObject.bgColor = color.colorValue;
      const listObject = state.listArray.find((list) => list.id === color.id);
      listObject.bgColor = color.colorValue;
   },
   closeStickyNoteColor:(state)=>{
    state.colorPicker = false;

   },
  },

  extraReducers:(builder)=>{
    builder
    .addCase(addSticky.fulfilled, (state, { payload }) => {
      console.log(payload)
      state.loader = false;
      state.success = true;
      state.listArray = [...state.listArray, payload];
    });
  }
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
  closeStickyNoteColor,
  openColorPicker,
} = stickySlice.actions;
export default stickySlice.reducer;
