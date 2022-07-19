import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addWarning, getAllBonus, GetPromotionById } from "./actions";

const initialState = {
  bonuses: [],
  loadingData: false,
  loader: true,
  bonusDetail: null,
};

const bonusSlice = createSlice({
  name: "bonus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllBonus.fulfilled, (state, action) => {
      state.bonuses = action.payload ? action.payload : [];
      state.loader = false;
    });

    // builder.addCase(GetPromotionById.fulfilled, (state, action) => {
    //   //   console.log("action.payload", action.payload);
    //   state.promotionDetail = action.payload.data;
    // });

    builder
      //   .addCase(addWarning.fulfilled, (state, { payload }) => {
      //     state.warningData = payload;
      //     return state;
      //   })
      .addMatcher(isPending(...[getAllBonus]), (state) => {
        state.loader = true;
      })
      .addMatcher(isRejected(...[getAllBonus]), (state) => {
        state.loader = true;
      });
  },
});

export const {} = bonusSlice.actions;
export default bonusSlice.reducer;
