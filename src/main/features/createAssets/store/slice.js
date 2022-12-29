import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import {
  getAllAssetItems,
  addAssetItem,
  getAssetItemDetailById,
  getAllAssetItemByPagination,
  updateAssetItems,
  getAssetItemByUserId,
  addInventoryAsset,
  getAllInventoryAsset,
} from './action';

const initialState = {
  assetItemList: [],
  assetItemByUserId: [],
  inventoryAssets: [],
  loader: false,
  success: false,
  error: false,
  drawerDeAllocOpen: false,
  drawerAllocOpen: false,
};

export const AssetItemSlice = createSlice({
  name: 'AssetItem',
  initialState,
  reducers: {
    clearAssetDetail: (state) => {
      state.assetsDetail = null;
    },
    handleOpenDeAllocComposer: (state, action) => {
      state.drawerDeAllocOpen = action.payload;
      console.log(state.drawerDeAllocOpen, 'state.drawerDeAllocOpen');
    },
    handleAllocOpenComposer: (state, action) => {
      state.drawerAllocOpen = action.payload;
      console.log(state.drawerAllocOpen, 'state.drawerAllocOpen');
    },
    handleResetDeAllocState: (state) => {
      state.assetItemByUserId = [];
      console.log(state.assetItemByUserId, 'assetItemByUserId');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAssetItems.fulfilled, (state, { payload }) => {
        state.assetItemList = payload;
        state.loader = false;
        state.success = true;
        state.drawerDeAllocOpen = false;
        state.drawerAllocOpen = false;
        console.log(payload, 'getAllAssetItemSlice');
      })
      .addCase(addAssetItem.fulfilled, (state, { payload }) => {
        state.assetItemList = [...state.assetItemList, payload];
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
      .addCase(updateAssetItems.fulfilled, (state, { payload }) => {
        state.success = true;
        state.drawerDeAllocOpen = false;
        state.loader = false;
        console.log(payload.data, 'updateAssetItemSlice');
      })
      .addCase(getAssetItemByUserId.fulfilled, (state, { payload }) => {
        state.assetItemByUserId = payload.data;
        state.loader = false;
        console.log(payload.data, 'getAllAssetItemByUserId slice');
      })
      // TODO: INVENTORY ASSET GET API
      .addCase(getAllInventoryAsset.fulfilled, (state, action) => {
        console.log(action.payload, 'getAllInventoryAsset slice');
        state.inventoryAssets = action.payload ? action.payload : [];
        state.success = true;
        state.loader = false;
      })
      // TODO: INVENTORY ASSET ADD API
      .addCase(addInventoryAsset.fulfilled, (state, { payload }) => {
        state.success = true;
        state.drawerAllocOpen = false;
        state.inventoryAssets = [...state.inventoryAssets, payload.data.data];
        console.log(state.drawerAllocOpen, 'state.drawerAllocOpen');
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
            addInventoryAsset,
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
            updateAssetItems,
            addInventoryAsset,
          ]
        ),
        (state) => {
          state.loader = true;
          state.loading = false;
          state.success = false;
          state.error = true;
        }
      );
  },
});
export const {
  clearAssetDetail,
  handleOpenDeAllocComposer,
  handleAllocOpenComposer,
  handleResetDeAllocState,
} = AssetItemSlice.actions;
export default AssetItemSlice.reducer;
