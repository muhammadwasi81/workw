import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import {
  addRequisition,
  addRequisitionOffer,
  getAllRequisition,
  GetAllRequisitionOffer,
  GetRequisitionById,
} from './actions';

const initialState = {
  success: false,
  items: [],
  offers: [],
  loadingData: false,
  loader: true,
  Detail: {},
  drawerOpen: false,
  drawerOpenOffer: false,
  cancelReward: {},
};

const requisitionSlice = createSlice({
  name: 'requisition',
  initialState,
  reducers: {
    handleOpenComposer: (state, { payload }) => {
      state.drawerOpen = payload;
    },
    handleOpenOfferComposer: (state, { payload }) => {
      state.drawerOpenOffer = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllRequisition.fulfilled, (state, action) => {
      state.items = action.payload ? action.payload : [];
      state.loader = false;
    });

    builder.addCase(GetRequisitionById.fulfilled, (state, action) => {
      state.Detail = action.payload.data;
      state.loadingData = false;
    });

    builder.addCase(GetAllRequisitionOffer.fulfilled, (state, action) => {
      state.offers = action.payload.data;
    });

    // builder.addCase(cancelReward.fulfilled, (state, action) => {
    //   state.cancelReward = action.payload.data;
    // });

    builder.addCase(addRequisition.fulfilled, (state, { payload }) => {
      state.drawerOpen = false;
      state.success = true;
      state.items = [...state.items, payload.data.data];
    });
    builder
      .addCase(addRequisitionOffer.fulfilled, (state, { payload }) => {
        state.drawerOpenOffer = false;
        state.success = true;
      })
      .addMatcher(isPending(...[getAllRequisition]), (state) => {
        state.loader = true;
        state.loadingData = true;
      })
      .addMatcher(isPending(...[GetRequisitionById]), (state) => {
        state.loadingData = true;
      })
      .addMatcher(isPending(...[addRequisition]), (state) => {
        state.loader = true;
      })
      .addMatcher(isRejected(...[getAllRequisition]), (state) => {
        state.loader = true;
      });
  },
});

export const {
  handleOpenComposer,
  handleOpenOfferComposer,
} = requisitionSlice.actions;
export default requisitionSlice.reducer;
