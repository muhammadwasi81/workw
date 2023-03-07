import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import {
  addBusinessPolicy,
  getAllBusinessPolicy,
  removeBusinessPolicy,
  updateBusinessPolicy,
} from './action';

const initialState = {
  businessPolicies: [],
  policyDetail: null,
  loader: false,
  success: false,
  error: false,
  editData: null,
  createLoader: false,
};

const businessPolicySlice = createSlice({
  name: 'businessPolicy',
  initialState,
  reducers: {
    handleOpenDetail: (state, action) => {
      state.policyDetail = action.payload;
    },
    businessDeleted: (state, { payload }) => {
      state.businessPolicies = state.businessPolicies.filter(
        (e) => e.id !== payload
      );
    },
    handleEdit: (state, { payload }) => {
      console.log(payload, 'FROM EDIT SLICE');
      state.editData = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBusinessPolicy.fulfilled, (state, { payload }) => {
        state.businessPolicies.push(payload.data);
        state.success = true;
        state.createLoader = false;
      })
      .addCase(getAllBusinessPolicy.fulfilled, (state, { payload }) => {
        state.businessPolicies = payload.data;
        state.policyDetail = payload.data[0];
        state.loader = false;
      })
      .addCase(removeBusinessPolicy.fulfilled, (state, { payload }) => {
        state.businessPolicies = state.businessPolicies.filter(
          (e) => e.id !== payload.data.id
        );
        state.loader = false;
      })
      .addCase(updateBusinessPolicy.fulfilled, (state, { payload }) => {
        state.businessPolicies = state.businessPolicies.map((e) =>
          e.id === payload.data.id ? payload.data : e
        );
        console.log('update slice call', payload.data);
        state.createLoader = false;
      })
      // .addMatcher(isPending(), (state) => {
      //   state.loader = true;
      // })
      // .addMatcher(isRejected(), (state) => {
      //   state.loader = false;
      //   state.error = true;
      // })
      .addMatcher(isPending(...[addBusinessPolicy]), (state) => {
        //state.loader = true;
        state.success = false;
        state.createLoader = true;
      })
      .addMatcher(isPending(...[getAllBusinessPolicy]), (state) => {
        state.loader = true;
        state.success = false;
        //state.createLoader = true;
      })
      .addMatcher(
        isRejected(...[addBusinessPolicy, getAllBusinessPolicy]),
        (state) => {
          state.loader = false;
          state.success = false;
          state.error = true;
          state.createLoader = false;
        }
      );
  },
});

export const {
  handleOpenDetail,
  businessDeleted,
  handleEdit,
} = businessPolicySlice.actions;
export default businessPolicySlice.reducer;
