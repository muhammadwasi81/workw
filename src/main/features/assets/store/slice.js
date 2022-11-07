import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import {
  getAllInventoryAsset,
  getInventoryAssetById,
  addInventoryAsset,
} from './action';

const initialState = {
  success: false,
  inventoryAssets: [],
  loadingData: false,
  loader: true,
};

const inventoryAssetSlice = createSlice({
  name: 'InventoryAsset',
  initialState,
  reducers: {
    clearInventoryAssetDetails: (state) => {
      state.inventoryDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllInventoryAsset.fulfilled, (state, action) => {
      console.log(action.payload, 'getAllInventoryAsset slice');
      state.inventoryAssets = action.payload ? action.payload : [];
      state.loader = false;
    });

    builder.addCase(getInventoryAssetById.fulfilled, (state, action) => {
      console.log(action.payload.data, 'getInventoryAssetById slice');
      state.inventoryAssets = action.payload.data;
    });

    builder
      .addCase(addInventoryAsset.fulfilled, (state, { payload }) => {
        console.log(payload, 'addInventoryAsset slice');
        state.success = true;
        state.inventoryAssets = [...state.inventoryAssets, payload.data.data];
      })
      .addMatcher(isPending(...[getAllInventoryAsset]), (state) => {
        state.loader = true;
      })
      .addMatcher(isRejected(...[getAllInventoryAsset]), (state) => {
        state.loader = true;
      });
  },
});

export const { clearInventoryAssetDetails } = inventoryAssetSlice.actions;
export default inventoryAssetSlice.reducer;
