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
  drawerOpen: false,
};

const requestItemSlice = createSlice({
  name: 'RequestListItems',
  initialState,
  reducers: {
    clearRequestDetails: (state) => {
      state.salaryDetail = null;
    },
    handleOpenComposer: (state, action) => {
      state.drawerOpen = action.payload;
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
        state.drawerOpen = false;
        state.loader = true;
        state.requestItems = [...state.requestItems, payload.data.data];
      })
      .addMatcher(
        isPending(
          ...[
            getAllRequestListItems,
            getRequestListItemsById,
            addRequestListItems,
          ]
        ),
        (state) => {
          console.log('isPending');
          state.loader = true;
        }
      )
      .addMatcher(isRejected(...[getAllRequestListItems]), (state) => {
        state.loader = true;
      });
  },
});

export const {
  clearRequestDetails,
  handleOpenComposer,
} = requestItemSlice.actions;
export default requestItemSlice.reducer;
