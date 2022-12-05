import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import {
  getAllDefaultApproversAction,
  getDefaultApproversByIdAction,
  addDefaultApproversAction,
  deleteDefaultApproversByIdAction,
} from './action';

const initialState = {
  approversData: [],
  loadingData: false,
  loader: true,
  defaultApproversDetail: {}, // single approver detail
};

const approverSlice = createSlice({
  name: 'defaultApprovers',
  initialState,
  reducers: {
    clearApproverDetail: (state) => {
      state.defaultApproversDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDefaultApproversAction.fulfilled, (state, { payload }) => {
        console.log(payload, 'getAllDefaultApproversAction slice');
        state.loadingData = false;
        state.approversData = payload;
      })
      .addCase(getDefaultApproversByIdAction.fulfilled, (state, action) => {
        console.log(action.payload, 'getDefaultApproversByIdAction Slice');
        state.defaultApproversDetail = action.payload.data;
        state.loadingData = false;
      })
      .addCase(addDefaultApproversAction.fulfilled, (state, action) => {
        console.log(action.payload, 'addDefaultApproversAction Slice');
        state.approversData = [...state.approversData, ...action.payload];
        state.loadingData = false;
      })
      .addCase(deleteDefaultApproversByIdAction.fulfilled, (state, action) => {
        console.log(action.payload, 'deleteDefaultApproversByIdAction Slice');
        state.defaultApproversDetail = state.approversData.filter(
          (item) => item.id !== action.payload.data.id
        );
        state.loadingData = false;
      });
    // .addMatcher(
    //   isPending(
    //     ...[
    //       getAllDefaultApproversAction,
    //       getDefaultApproversByIdAction,
    //       addDefaultApproversAction,
    //       deleteDefaultApproversByIdAction,
    //     ]
    //   ),
    //   (state) => {
    //     console.log('pending');
    //     state.loader = true;
    //     state.loadingData = true;
    //   }
    // )
    // .addMatcher(
    //   isRejected(
    //     ...[
    //       getAllDefaultApproversAction,
    //       getDefaultApproversByIdAction,
    //       addDefaultApproversAction,
    //       deleteDefaultApproversByIdAction,
    //     ]
    //   ),
    //   (state) => {
    //     state.loader = false;
    //     state.loadingData = false;
    //   }
    // );
  },
});

export const { clearApproverDetail } = approverSlice.actions;
export default approverSlice.reducer;
