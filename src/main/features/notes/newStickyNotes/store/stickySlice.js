import { createSlice } from "@reduxjs/toolkit";
import { createGuid } from "../../../../../utils/base";

const defaultSticky = {
  id:createGuid(),
  title:"",
  description:"",
  privacyId:"",
  isOpen: true,
};

const openSticky={
  id:createGuid(),
  title:"",
  description:"",
}
export const stickySlice = createSlice({
  name: "StickNoteSlice",
  initialState: {
    open: false,
    listArray: [],
    incrementNotes:[],
  },
  reducers: {
    closeSticky: (state) => {
      state.open = false;
    },
    addStickyNote: (state) => {
      state.listArray = [
        ...state.listArray,
        defaultSticky
      ];
    },
    toggleStickyNote: (state) => {
      state.open = !state.open;
      // console.log("toggleStikcy", state);
    },
    openClickedSticky:(state,action)=>{
      const listId=action.payload;
      let existNotes=incrementNotes.map((item)=>item.id);
      // console.log("exist Notes",existNotes);
      if(!existNotes.includes(listId.id)){
        state.incrementNotes=[
          ...state.incrementNotes,
          openSticky
        ]
      }
    }
  },
});
export const {
  closeSticky,
  addStickyNote,
  toggleStickyNote,
  openClickedSticky,
} = stickySlice.actions;
export default stickySlice.reducer;
