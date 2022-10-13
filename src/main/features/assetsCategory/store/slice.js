import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import { responseCode } from '../../../../services/enums/responseCode.js';
import {
  addAssetCategory,
  getAllAssetCategories,
  updateAssetCategory,
} from './actions.js';

const initialState = {
  assetsData: [],
  loadingData: false,
  loader: false,
};

const assetsCategorySlice = createSlice({
  name: 'AssetCategory',
  initialState,
  reducers: {
    reset: (state) => {
      state.assetsData = [];
      state.loadingData = false;
      state.loader = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAssetCategories.fulfilled, (state, { payload }) => {
        console.log(payload, 'getallAssetCategoriesSlice');
        state.loadingData = false;
        state.assetsData = payload;
      })
      .addCase(addAssetCategory.fulfilled, (state, { payload }) => {
        state.loader = false;
        if (payload.responseCode === responseCode.Success)
          console.log(payload, 'addAssetCategory slice');
        state.assetsData.push(payload.data);
      })
      .addCase(updateAssetCategory.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.assetsData = state.assetsData.map((x) =>
          x.id === payload.data.id ? payload.data : x
        );
        console.log(payload, 'updateAssetCategory slice');
        // if item is already existed show error message
        if (state.assetsData.find((x) => x.id === payload.data.id)) {
          state.assetsData = state.assetsData.map((x) =>
            x.id === payload.data.id ? payload.data : x
          );
        }
      })
      .addMatcher(
        isPending(...[addAssetCategory, updateAssetCategory]),
        (state) => {
          state.loader = true;
        }
      )
      .addMatcher(isPending(...[getAllAssetCategories]), (state) => {
        console.log('pending');
        state.loadingData = true;
      })
      .addMatcher(
        isRejected(
          ...[getAllAssetCategories, addAssetCategory, updateAssetCategory]
        ),
        (state) => {
          console.log('rejected');
          state.loader = false;
          state.loadingData = false;
        }
      );
  },
});
export const { reset } = assetsCategorySlice.reducer;
export default assetsCategorySlice.reducer;
