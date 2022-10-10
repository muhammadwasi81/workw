import { createSlice } from "@reduxjs/toolkit";
import { addCareer } from "./action";

const initialState = {
  success: false,
  items: [],
  drawerOpen: false,
};

const careerSlice = createSlice({
  name: "careers",
  initialState,
  reducers: {
    handleOpenComposer: (state, { payload }) => {
      state.drawerOpen = payload
    },
  },
  extraReducers: (builder) => {

    builder
      .addCase(addCareer.fulfilled, (state, { payload }) => {
        state.drawerOpen = false
        state.success = true
        state.items = [...state.items, payload.data.data];
      })
  },
});

export const { handleOpenComposer } = careerSlice.actions;
export default careerSlice.reducer;
