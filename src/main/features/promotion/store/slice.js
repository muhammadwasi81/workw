import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  addPromotion,
  getAllPromotions,
  GetPromotionById,
  cancelPromotion,
} from "./actions";

const initialState = {
  promotions: [],
  cancelPromotion: {},
  loadingData: false,
  loader: true,
  promotionDetail: {},
  drawerOpen: false,
};

const promotionSlice = createSlice({
  name: "promotions",
  initialState,
  reducers: {
    handleOpenComposer: (state, { payload }) => {
      state.drawerOpen = payload;
    },
    cancelPromotionSuccess: (state, { payload }) => {
      let promotionList = [...state.promotions];
      let index = promotionList.findIndex(
        (item) => item.id === payload.promotionId
      );
      let promotion = promotionList.filter(
        (item) => item.id === payload.promotionId
      )[0];

      promotionList[index] = {
        ...promotion,
        status: 4,
      };

      state.promotions = promotionList;
      state.promotionDetail = {
        ...promotion,
        status: 4,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPromotions.fulfilled, (state, action) => {
      state.promotions = action.payload ? action.payload : [];
      state.loader = false;
    });

    builder.addCase(GetPromotionById.fulfilled, (state, action) => {
      state.promotionDetail = action.payload.data;
      state.loadingData = false;
      // console.log(state.promotionDetail, "payload dataaaaa ");
    });
    // builder.addCase(cancelPromotion.fulfilled, (state, action) => {
    //   state.cancelPromotion = action.payload.data;
    //   // state.success = true;
    //   // state.loader = false;
    // });

    builder
      .addCase(addPromotion.fulfilled, (state, { payload }) => {
        state.success = true;
        state.loading = false;
        state.drawerOpen = false;
        state.promotions = [payload, ...state.promotions];

        // state.drawerOpen = false;
        // return state;
      })

      .addMatcher(isPending(...[getAllPromotions]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[GetPromotionById]), (state) => {
        state.loadingData = true;
      })
      .addMatcher(isRejected(...[getAllPromotions]), (state) => {
        state.loader = true;
      });
  },
});

export const {
  handleOpenComposer,
  cancelPromotionSuccess,
} = promotionSlice.actions;
export default promotionSlice.reducer;
