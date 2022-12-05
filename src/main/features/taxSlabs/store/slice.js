import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import {
  addTaxSlabGroup,
  GetAllTaxSlabGroup,
  removeBusinessPolicy,
  updateBusinessPolicy,
} from './action';

const initialState = {
  items: [],
  policyDetail: null,
  loader: false,
  success: false,
  error: false,
  editData: null,
};

const taxSlabGroupSlice = createSlice({
  name: 'TaxSlabGroup',
  initialState,
  reducers: {
    handleOpenDetail: (state, action) => {
      state.policyDetail = action.payload;
    },
    businessDeleted: (state, { payload }) => {
      state.items = state.items.filter(
        (e) => e.id !== payload
      );
    },
    handleEdit: (state, { payload }) => {
      state.editData = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTaxSlabGroup.fulfilled, (state, { payload }) => {
        state.items.push(payload.data);
        state.success = true;
        state.loader = false;
      })
      .addCase(GetAllTaxSlabGroup.fulfilled, (state, { payload }) => {
        state.items = [...payload];
        // state.policyDetail = payload.data[0];
        state.loader = false;
      })
      .addCase(removeBusinessPolicy.fulfilled, (state, { payload }) => {
        state.items = state.items.filter(
          (e) => e.id !== payload.data.id
        );
        state.loader = false;
      })
      .addCase(updateBusinessPolicy.fulfilled, (state, { payload }) => {
        state.items = state.items.map((e) =>
          e.id === payload.data.id ? payload.data : e
        );
        state.loader = false;
      })
      .addMatcher(isPending(), (state) => {
        state.loader = true;
      })
      .addMatcher(isRejected(), (state) => {
        state.loader = false;
        state.error = true;
      })
      .addMatcher(
        isPending(...[addTaxSlabGroup, GetAllTaxSlabGroup]),
        (state) => {
          state.loader = true;
          state.success = false;
        }
      )
      .addMatcher(
        isRejected(...[addTaxSlabGroup, GetAllTaxSlabGroup]),
        (state) => {
          state.loader = false;
          state.success = false;
          state.error = true;
        }
      );
  },
});

export const {
  handleOpenDetail,
  businessDeleted,
  handleEdit,
} = taxSlabGroupSlice.actions;
export default taxSlabGroupSlice.reducer;
