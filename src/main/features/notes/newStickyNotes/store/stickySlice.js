import { createSlice } from "@reduxjs/toolkit";
import { createGuid } from "../../../../../utils/base";

const defaultSticky = {
  id:createGuid(),
  title:"",
  description:"",
  privacyId:"",
  isOpen: true,
};

export const stickySlice = createSlice({
  name: "StickNoteSlice",
  initialState: {
    open: false,
    listArray: [],
  },
  reducers: {
    closeSticky: (state) => {
      state.open = false;
    },
    addStickyNote: (state, action) => {
      state.listArray = [
        ...state.listArray,
        defaultSticky
      ];
      // .push({
      //   id,
      //   title,
      //   description,
      //   privacyId,
      //   isOpen: true,
      // });
    },
    toggleStickyNote: (state) => {
      state.open = !state.open;
      console.log("toggleStikcy", state);
    },
  },
});
export const {
  closeSticky,
  addStickyNote,
  toggleStickyNote,
} = stickySlice.actions;
export default stickySlice.reducer;
