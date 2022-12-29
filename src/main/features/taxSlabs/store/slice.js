import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  addTaxSlabGroup,
  GetAllTaxSlabGroup,
  removeBusinessPolicy,
  updateBusinessPolicy,
  updateTaxSlab,
  getTaxSlabById,
  removeTaxSlab,
} from "./action";

const initialState = {
  items: [],
  policyDetail: null,
  loader: false,
  success: false,
  error: false,
  editData: null,
  taxSlabDetail: null,
  createLoader:false,
};

const taxSlabGroupSlice = createSlice({
  name: "TaxSlabGroup",
  initialState,
  reducers: {
    handleOpenDetail: (state, action) => {
      state.policyDetail = action.payload;
    },
    businessDeleted: (state, { payload }) => {
      state.items = state.items.filter((e) => e.id !== payload);
    },
    handleEdit: (state, { payload }) => {
      state.editData = payload;
    },
    TaxSlabDeleted: (state, { payload }) => {
      state.items = state.items.filter((e) => e.id !== payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTaxSlabGroup.fulfilled, (state, { payload }) => {
        state.items.push(payload.data);
        state.success = true;
        state.createLoader = false;
      })
      .addCase(GetAllTaxSlabGroup.fulfilled, (state, { payload }) => {
        state.items = [...payload];
        // state.policyDetail = payload.data[0];
        //state.loader = false;
        state.loader = false;
      })
      .addCase(getTaxSlabById.fulfilled, (state, { payload }) => {
        console.log(payload, "slice payload");
        state.taxSlabDetail = payload.data;
        state.loader = false;
      })
      .addCase(updateTaxSlab.fulfilled, (state, { payload }) => {
        state.items = state.items.map((x) =>
          x.id === payload.data.id ? payload.data : x
        );
        state.success = true;
        state.createLoader = false;
        console.log(payload.data, "payload.data tax slab");
      })
      .addCase(removeTaxSlab.fulfilled, (state, { payload }) => {})
      .addCase(removeBusinessPolicy.fulfilled, (state, { payload }) => {
        state.items = state.items.filter((e) => e.id !== payload.data.id);
        state.loader = false;
      })
      .addCase(updateBusinessPolicy.fulfilled, (state, { payload }) => {
        state.items = state.items.map((e) =>
          e.id === payload.data.id ? payload.data : e
        );
        // state.loader = false;
      })
      // .addMatcher(isPending(), (state) => {
      //   state.loader = true;
      // })
      .addMatcher(isRejected(...[getTaxSlabById]), (state) => {
        state.loader = true;
        state.success = false;
      })
      // .addMatcher(isRejected(), (state) => {
      //   state.loader = false;
      //   state.error = true;
      // })
      .addMatcher(
        isPending(...[addTaxSlabGroup]),
        (state) => {
          state.createLoader = true;
          state.success = false;
          //state.createLoader = true;
        }
      )
      .addMatcher(
        isPending(...[GetAllTaxSlabGroup]),
        (state) => {
          state.loader = true;
          state.success = false;
          // state.createLoader = true;
        }
      )
      .addMatcher(
        isRejected(...[addTaxSlabGroup, GetAllTaxSlabGroup]),
        (state) => {
          state.loader = false;
          state.success = false;
          state.error = true;
          state.createLoader = false;
        }
      )
      .addMatcher(isRejected(...[getTaxSlabById]), (state) => {
        state.loader = false;
        state.success = false;
        state.error = true;
      });
  },
});

export const {
  handleOpenDetail,
  businessDeleted,
  handleEdit,
  TaxSlabDeleted,
} = taxSlabGroupSlice.actions;
export default taxSlabGroupSlice.reducer;
