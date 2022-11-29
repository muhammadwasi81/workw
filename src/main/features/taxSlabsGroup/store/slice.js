import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode.js";
import { addTaxSlab, getAllBranch, getAllTaxSlab, updateBranch, updateTaxSlab } from "./actions.js";

const initialState = {
  items: [],
  loadingData: false,
  loader: false,
  countryId: [],
};

const taxSlabSlice = createSlice({
  name: "items",
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
      })
      .addCase(addTaxSlab.fulfilled, (state, { payload }) => {
        state.loader = false;
          // state.items.push(payload.data);
      })
      .addCase(updateTaxSlab.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.items = state.items.map((x) =>
          x.id === payload.data.id ? payload.data : x
        );
      })
      .addMatcher(isPending(...[addTaxSlab, updateTaxSlab]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[getAllTaxSlab]), (state) => {
        state.loadingData = true;
      })
      .addMatcher(
        isRejected(...[getAllTaxSlab, addTaxSlab, updateTaxSlab]),
        (state) => {
          state.loader = false;
          state.loadingData = false;
        }
      );
  },
});

export const { TaxSlabDeleted } = taxSlabSlice.actions;
export default taxSlabSlice.reducer;
