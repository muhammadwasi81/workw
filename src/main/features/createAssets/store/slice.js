import { createSlice, isPending } from '@reduxjs/toolkit';
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
  loader: false,
  success: false,
  error: false,
};

export const AssetItemSlice = createSlice({
  name: 'AssetItem',
  initialState,
  reducers: {
    clearAssetDetail: (state) => {
      state.assetsDetail = null;
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
        state.assetItemByUserId = payload;
        state.loader = false;
        state.success = true;
        console.log(payload, 'getAllAssetItemByUserId slice');
      })
      .addCase(updateAssetItems.fulfilled, (state, { payload }) => {
        state.assetItemList = payload;
        state.loader = false;
        state.success = true;
        console.log(payload, 'updateAssetItemSlice');
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
            getAllAssetItemByPagination,
            updateAssetItems,
          ]
        ),
        (state) => {
          state.loader = true;
          state.success = false;
          state.error = false;
        }
      );
  },
});
export const { clearAssetDetail } = AssetItemSlice.actions;
export default AssetItemSlice.reducer;
