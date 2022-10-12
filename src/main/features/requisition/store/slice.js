import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addRequisition, getAllRequisition, GetRequisitionById } from "./actions";

const initialState = {
  success: false,
  items: [],
  loadingData: false,
  loader: true,
  Detail: {},
  drawerOpen: false,
  cancelReward: {}
};

const requisitionSlice = createSlice({
  name: "requisition",
  initialState,
  reducers: {
    handleOpenComposer: (state, { payload }) => {
      state.drawerOpen = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllRequisition.fulfilled, (state, action) => {
      state.items = action.payload ? action.payload : [];
      state.loader = false;
    });

    builder.addCase(GetRequisitionById.fulfilled, (state, action) => {
      state.Detail = action.payload.data;
    });

    // builder.addCase(cancelReward.fulfilled, (state, action) => {
    //   state.cancelReward = action.payload.data;
    // });

    builder
      .addCase(addRequisition.fulfilled, (state, { payload }) => {
        state.drawerOpen = false
        state.success = true
        state.items = [...state.items, payload.data.data];
      })
      .addMatcher(isPending(...[getAllRequisition]), (state) => {
        state.loader = true;
      })
      .addMatcher(isRejected(...[getAllRequisition]), (state) => {
        state.loader = true;
      });
  },
});

export const { handleOpenComposer } = requisitionSlice.actions;
export default requisitionSlice.reducer;
