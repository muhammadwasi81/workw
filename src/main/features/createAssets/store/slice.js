import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import {
  getAllAssetItems,
  addAssetItem,
  getAssetItemDetailById,
  getAllAssetItemByPagination,
  updateAssetItems,
  getAssetItemByUserId,
} from './action';

const initialState = {
  assetItemList: [],
  assetItemByUserId: [],
  loader: true,
  success: false,
  error: false,
  drawerOpen: false,
};

export const AssetItemSlice = createSlice({
  name: 'AssetItem',
  initialState,
  reducers: {
    clearAssetDetail: (state) => {
      state.assetsDetail = null;
    },
    clearModalDetail: (state) => {
      state.assetsDetail = null;
      console.log(state.assetsDetail, 'modalSuccess');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAssetItems.fulfilled, (state, { payload }) => {
        state.assetItemList = payload;
        state.loader = false;
        state.success = true;
        console.log(payload, 'getAllAssetItemSlice');
      })
      .addCase(addAssetItem.fulfilled, (state, { payload }) => {
        state.assetItemList = [...state.assetItemList, payload];
        state.loader = false;
        state.success = true;
        console.log(payload, 'addAssetItemSlice');
      })
      .addCase(getAssetItemDetailById.fulfilled, (state, { payload }) => {
        state.assetItemByUserId = payload.data;
        state.loader = false;
        state.success = true;
        console.log(payload.data, 'getAssetItemDetailByIdSlice');
      })
      .addCase(getAssetItemByUserId.fulfilled, (state, { payload }) => {
        state.assetItemByUserId = payload.data;
        state.loader = false;
        console.log(payload.data, 'getAllAssetItemByUserId slice');
      })
      .addCase(updateAssetItems.fulfilled, (state, { payload }) => {
        console.log(payload, 'updateAssetItemSlice');
        // state.success = true;
        state.drawerOpen = true;
        state.success = true;
        console.log(state.drawerOpen, 'state.drawerOpen');
        state.loader = false;
        state.assetItemList = payload;
      })
      .addCase(getAllAssetItemByPagination.fulfilled, (state, { payload }) => {
        state.assetItemByPagination = payload;
        state.loader = false;
        state.success = true;
        console.log(payload, 'getAllAssetItemByPaginationSlice');
      })
      .addMatcher(
        isPending(
          ...[
            getAllAssetItems,
            addAssetItem,
            getAssetItemDetailById,
            getAssetItemByUserId,
            updateAssetItems,
          ]
        ),
        (state) => {
          state.loader = true;
          state.success = false;
          state.error = false;
          state.success = false;
        }
      )
      .addMatcher(
        isRejected(
          ...[
            getAllAssetItems,
            addAssetItem,
            getAssetItemDetailById,
            getAssetItemByUserId,
          ]
        ),
        (state) => {
          state.loading = false;
          state.success = false;
          state.error = true;
        }
      );
  },
});
export const { clearAssetDetail, clearModalDetail } = AssetItemSlice.actions;
export default AssetItemSlice.reducer;
