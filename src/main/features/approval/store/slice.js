import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { getAllApproval } from "./action";

const initialState = {
  approvalList:[],
  loader:false
};

const approvalSlice = createSlice({
  name: "approval",
  initialState,
  reducers: {
    handleOpenComposer: (state, { payload }) => {
      state.drawerOpen = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllApproval.fulfilled, (state, {payload}) => {
      state.loader = false;
      state.approvalList = payload;
    })
  },
});

export const { handleOpenComposer } = approvalSlice.actions;
export default approvalSlice.reducer;
