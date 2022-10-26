import { createSlice, isPending } from '@reduxjs/toolkit';
import {
  getAllAssetItems,
  addAssetItem,
  getAllAssetItemByUserId,
  getAssetItemDetailById,
  getAllAssetItemByPagination,
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
      .addCase(getAllAssetItemByUserId.fulfilled, (state, { payload }) => {
        state.assetItemByUserId = payload;
        state.loader = false;
        state.success = true;
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
            getAllAssetItemByUserId,
            getAllAssetItemByPagination,
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
