import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode.js";
import { 
  addTaxSlab, 
  getTaxSlabById,
  getAllBranch, 
  getAllTaxSlab, 
  updateBranch, 
  updateTaxSlab } from "./actions.js";

const initialState = {
  items: [],
  loadingData: false,
  loader: false,
  success: false,
};

const taxSlabGroupSlice = createSlice({
  name: "TaxSlabsGroup", 
  initialState,
  reducers: {
    TaxSlabDeleted: (state, { payload }) => {
      state.items = state.items.filter((e) => e.id !== payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getAllTaxSlab.fulfilled, (state, { payload }) => {
        state.loadingData = false;
        state.items = payload.data;
        state.success = true;
        console.log(payload, 'payloadslice')
    })
      .addCase(addTaxSlab.fulfilled, (state, {payload}) => {
        if (payload.responseCode === responseCode.Success)
          state.items.push(payload.data)
          console.log(payload, 'addslice');
          state.loader = false;
          state.success=true;
      })
      .addCase(getTaxSlabById.fulfilled, (state, { payload }) => {
        state.items = payload;
      })
      .addMatcher(isPending(...[addTaxSlab]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[getAllTaxSlab]), (state) => {
        console.log('pending');
        state.loadingData = true;
        state.success = false;
      })
      .addMatcher(
        isRejected(...[getAllTaxSlab, addTaxSlab]),
        (state) => {
          state.loader = false;
          state.loadingData = false;
        }
      );
  },
});

export const { TaxSlabDeleted } = taxSlabGroupSlice.actions;
export default taxSlabGroupSlice.reducer;
