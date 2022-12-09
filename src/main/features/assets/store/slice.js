import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import {
  addInventoryAsset,
  getAllInventoryAsset,
} from '../../createAssets/store/action';
import { getInventoryAssetById } from './action';

const initialState = {
  success: false,
  inventoryAssets: [],
  loadingData: false,
  loader: false,
  drawerAllocOpen: false,
};

const inventoryAssetSlice = createSlice({
  name: 'InventoryAsset',
  initialState,
  reducers: {
    handleAllocOpenComposer: (state, action) => {
      state.drawerAllocOpen = action.payload;
      console.log(state.drawerAllocOpen, 'state.drawerAllocOpen');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInventoryAssetById.fulfilled, (state, action) => {
      console.log(action.payload, 'getInventoryAssetById slice');
      state.loader = false;
      state.inventoryAssets = action.payload.data;
    });

    builder
      .addMatcher(isPending(...[getAllInventoryAsset]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[addInventoryAsset]), (state) => {
        state.loader = true;
      })
      .addMatcher(isRejected(...[getAllInventoryAsset]), (state) => {
        state.loader = true;
      });
  },
});

export const { handleAllocOpenComposer } = inventoryAssetSlice.actions;
export default inventoryAssetSlice.reducer;
