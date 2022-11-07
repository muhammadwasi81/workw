import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addResignation, getAllResignations, GetResignationById } from "./action";

const initialState = {
  items: [],
  drawerOpen: false,
  loader: false,
  detail: {}
};

const resignationSlice = createSlice({
  name: "resignations",
  initialState,
  reducers: {
    handleOpenComposer: (state, { payload }) => {
      state.drawerOpen = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllResignations.fulfilled, (state, action) => {
      state.loader = false;
      state.items = action.payload ? action.payload : [];
    })

    builder.addCase(GetResignationById.fulfilled, (state, action) => {
      state.detail = action.payload.data;
    })

    builder
      .addCase(addResignation.fulfilled, (state, { payload }) => {
        state.drawerOpen = false
        state.success = true
        state.items = [...state.items, payload.data.data];
      })
      .addMatcher(isPending(...[getAllResignations]), (state) => {
        state.loader = true;
      })
      .addMatcher(isRejected(...[getAllResignations]), (state) => {
        state.loader = false;
      });
  },


});

export const { handleOpenComposer } = resignationSlice.actions;
export default resignationSlice.reducer;
