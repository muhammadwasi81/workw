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
  },
  reducers: {
    closeSticky: (state) => {
      state.open = false;
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
    }
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
  handleChangeNote
} = stickySlice.actions;
export default stickySlice.reducer;
