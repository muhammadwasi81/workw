import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import {
  addBonus,
  addWarning,
  cancelBonus,
  getAllBonus,
  GetBonusById,
  GetPromotionById,
} from './actions';

const initialState = {
  bonuses: [],
  loadingData: false,
  loader: true,
  bonusDetail: {},
  drawerOpen: false,
  cancelBonuss: {},
};

const bonusSlice = createSlice({
  name: 'bonus',
  initialState,
  reducers: {
    handleOpenComposer: (state, { payload }) => {
      state.drawerOpen = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllBonus.fulfilled, (state, action) => {
      state.bonuses = action.payload ? action.payload : [];
      state.loader = false;
    });

    builder.addCase(GetBonusById.fulfilled, (state, action) => {
      state.bonusDetail = action.payload.data;
    });

    builder.addCase(cancelBonus.fulfilled, (state, action) => {
      state.cancelBonuss = action.payload.data;
    });

    builder
      .addCase(addBonus.fulfilled, (state, { payload }) => {
        // state.warningData = payload;
        state.bonuses = [payload.data.data, ...state.bonuses];
        state.drawerOpen = false;
        return state;
      })
      .addMatcher(isPending(...[getAllBonus]), (state) => {
        state.loader = true;
      })
      .addMatcher(isRejected(...[getAllBonus]), (state) => {
        state.loader = true;
      });
  },
});

export const { handleOpenComposer } = bonusSlice.actions;
export default bonusSlice.reducer;
