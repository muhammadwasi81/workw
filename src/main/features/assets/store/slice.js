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
    // builder
    // .addCase(getAllInventoryAsset.fulfilled, (state, action) => {
    //   console.log(action.payload, 'getAllInventoryAsset slice');
    //   state.inventoryAssets = action.payload ? action.payload : [];
    //   state.success = true;
    //   state.loader = false;
    // });
    builder.addCase(getInventoryAssetById.fulfilled, (state, action) => {
      console.log(action.payload.data, 'getInventoryAssetById slice');
      state.inventoryAssets = action.payload.data;
    });
    // .addCase(addInventoryAsset.fulfilled, (state, { payload }) => {
    //   state.inventoryAssets = [...state.inventoryAssets, payload.data.data];
    //   state.success = true;
    //   state.drawerAllocOpen = false;
    //   console.log(state.drawerAllocOpen, 'state.drawerOpen');
    // })
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
