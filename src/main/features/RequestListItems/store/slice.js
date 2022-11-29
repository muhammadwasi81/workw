import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import {
  getAllRequestListItems,
  getRequestListItemsById,
  addRequestListItems,
} from './action';

const initialState = {
  success: false,
  requestItems: [],
  loadingData: false,
  loader: true,
  requestItemDetail: {},
};

const requestItemSlice = createSlice({
  name: 'RequestListItems',
  initialState,
  reducers: {
    clearRequestDetails: (state) => {
      state.salaryDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllRequestListItems.fulfilled, (state, action) => {
      console.log(action.payload, 'getAllRequestListItems slice');
      state.requestItems = action.payload ? action.payload : [];
      state.loader = false;
    });

    builder.addCase(getRequestListItemsById.fulfilled, (state, action) => {
      console.log(action.payload.data, 'getRequestListItemsById slice');
      state.requestItemDetail = action.payload.data;
      state.loadingData = false;
    });

    builder
      .addCase(addRequestListItems.fulfilled, (state, { payload }) => {
        console.log(payload, 'addRequestListItems slice');
        state.success = true;
        state.requestItems = [...state.requestItems, payload.data.data];
      })
      .addMatcher(isPending(...[getAllRequestListItems]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[getRequestListItemsById]), (state) => {
        state.loadingData = true;
      })
      .addMatcher(isRejected(...[getAllRequestListItems]), (state) => {
        state.loader = true;
      });
  },
});

export const { clearRequestDetails } = requestItemSlice.actions;
export default requestItemSlice.reducer;
