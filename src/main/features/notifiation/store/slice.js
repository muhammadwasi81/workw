import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { getAllNotification } from "./action";

const initialState = {
  notificationList:[],
  loader:false
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    handleOpenComposer: (state, { payload }) => {
      state.drawerOpen = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllNotification.fulfilled, (state, {payload}) => {
      state.loader = false;
      state.notificationList = payload;
    })
  },
});

export const { handleOpenComposer } = notificationSlice.actions;
export default notificationSlice.reducer;
