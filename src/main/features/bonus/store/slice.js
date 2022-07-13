import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addWarning, getAllPromotions, GetPromotionById } from "./actions";

const initialState = {
  promotions: [],
  loadingData: false,
  loader: true,
  promotionDetail: null,
};

const promotionSlice = createSlice({
  name: "promotions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPromotions.fulfilled, (state, action) => {
      state.promotions = action.payload ? action.payload : [];
      state.loader = false;
    });

    builder.addCase(GetPromotionById.fulfilled, (state, action) => {
      //   console.log("action.payload", action.payload);
      state.promotionDetail = action.payload.data;
    });

    builder
      //   .addCase(addWarning.fulfilled, (state, { payload }) => {
      //     state.warningData = payload;
      //     return state;
      //   })
      .addMatcher(isPending(...[getAllPromotions]), (state) => {
        state.loader = true;
      })
      .addMatcher(isRejected(...[getAllPromotions]), (state) => {
        state.loader = true;
      });
  },
});

export const {} = promotionSlice.actions;
export default promotionSlice.reducer;
