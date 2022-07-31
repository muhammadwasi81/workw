import { createSlice } from "@reduxjs/toolkit";

export const resignationSlice = createSlice({
  name: "resignationSlice",
  initialState: {
    listItem: false,
  },
  reducers: {
    OpenDetailView: (state, action) => {
      //   const id = action.payload;
      //   console.log(id);
      state.listItem = true;
    },
    CloseDetailView: (state) => {
      state.listItem = false;
    },
  },
});

export const { OpenDetailView, CloseDetailView } = resignationSlice.actions;
export default resignationSlice.reducer;
