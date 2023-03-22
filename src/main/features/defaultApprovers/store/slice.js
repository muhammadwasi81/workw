import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import {
  getAllDefaultApproversAction,
  addDefaultApproversAction,
} from './action';

const initialState = {
  approversData: [],
  loadingData: false,
  loader: true,
};

const approverSlice = createSlice({
  name: 'defaultApprovers',
  initialState,
  reducers: {
    handleApproversDelete: (state, { payload }) => {
      
      state.approversData = state.approversData.filter(
        (item) => item.id !== payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDefaultApproversAction.fulfilled, (state, { payload }) => {
        console.log(payload, 'getAllDefaultApproversAction slice');
        state.loadingData = false;
        state.approversData = payload;
        state.loader = false;
      })
      .addCase(addDefaultApproversAction.fulfilled, (state, action) => {
        console.log(action.payload, 'addDefaultApproversAction Slice');
        state.approversData = [...state.approversData, ...action.payload];
        state.loadingData = false;
        state.loader = false;
      })
      .addMatcher(
        isPending(...[getAllDefaultApproversAction, addDefaultApproversAction]),
        (state) => {
          console.log('pending');
          state.loader = true;
          state.loadingData = true;
        }
      )
      .addMatcher(
        isRejected(
          ...[getAllDefaultApproversAction, addDefaultApproversAction]
        ),
        (state) => {
          state.loader = false;
          state.loadingData = false;
        }
      );
  },
});

export const { handleApproversDelete } = approverSlice.actions;
export default approverSlice.reducer;
