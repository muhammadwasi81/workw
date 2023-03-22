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
  createLoader: false,
};

const bonusSlice = createSlice({
  name: 'bonus',
  initialState,
  reducers: {
    handleOpenComposer: (state, { payload }) => {
      state.drawerOpen = payload;
    },
    cancelBonusSuccess: (state, { payload }) => {
      let bonusList = [...state.bonuses];
      let index = bonusList.findIndex((item) => item.id === payload.bonusId);
      let bonus = bonusList.filter((item) => item.id === payload.bonusId)[0];

      bonusList[index] = {
        ...bonus,
        status: 4,
      };

      state.bonuses = bonusList;
      state.bonusDetail = {
        ...bonus,
        status: 4,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllBonus.fulfilled, (state, action) => {
      state.bonuses = action.payload ? action.payload : [];
      state.loader = false;
    });

    builder.addCase(GetBonusById.fulfilled, (state, action) => {
      state.bonusDetail = action.payload.data;
      state.loadingData = false;
    });

    // builder.addCase(cancelBonus.fulfilled, (state, action) => {
    //   state.cancelBonuss = action.payload.data;
    // });

    builder
      .addCase(addBonus.fulfilled, (state, { payload }) => {
        // state.warningData = payload;
        state.bonuses = [payload.data.data, ...state.bonuses];
        state.drawerOpen = false;
        state.createLoader = false;
        return state;
      })
      .addMatcher(isPending(...[getAllBonus]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[GetBonusById]), (state) => {
        state.loadingData = true;
      })
      .addMatcher(isPending(...[addBonus]), (state) => {
        state.createLoader = true;
      })
      .addMatcher(isRejected(...[getAllBonus]), (state) => {
        state.loader = false;
      })
      .addMatcher(isRejected(...[addBonus]), (state) => {
        state.createLoader = false;
      });
  },
});

export const { handleOpenComposer, cancelBonusSuccess } = bonusSlice.actions;
export default bonusSlice.reducer;
