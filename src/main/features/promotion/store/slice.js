import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addPromotion, getAllPromotions, GetPromotionById } from "./actions";

const initialState = {
  promotions: [],
  loadingData: false,
  loader: true,
  promotionDetail: null,
  drawerOpen: false,
};

const promotionSlice = createSlice({
  name: "promotions",
  initialState,
  reducers: {
    handleOpenComposer: (state, { payload }) => {
      state.drawerOpen = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPromotions.fulfilled, (state, action) => {
      state.promotions = action.payload ? action.payload : [];
      state.loader = false;
    });

    builder.addCase(GetPromotionById.fulfilled, (state, action) => {
      state.promotionDetail = action.payload.data;
    });

    builder
        .addCase(addPromotion.fulfilled, (state, { payload }) => {
          state.promotions=[payload.data.data,...state.promotions]
          state.drawerOpen = false;
          return state;
        })
      .addMatcher(isPending(...[getAllPromotions]), (state) => {
        state.loader = true;
      })
      .addMatcher(isRejected(...[getAllPromotions]), (state) => {
        state.loader = true;
      });
  },
});

export const { handleOpenComposer } = promotionSlice.actions;
export default promotionSlice.reducer;
