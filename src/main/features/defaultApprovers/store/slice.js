import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import {
  getAllDefaultApproversAction,
  getDefaultApproversByIdAction,
  addDefaultApproversAction,
  deleteDefaultApproversByIdAction,
} from './action';

const initialState = {
  defaultApprovers: [],
  loadingData: false,
  loader: true,
  defaultApproversDetail: {},
};

const approverSlice = createSlice({
  name: 'defaultApprovers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllDefaultApproversAction.fulfilled, (state, action) => {
      console.log(action.payload, 'getAllDefaultApprovers Slice');
      state.defaultApprovers = action.payload ? action.payload : [];
      state.loader = false;
    });
    builder.addCase(
      getDefaultApproversByIdAction.fulfilled,
      (state, action) => {
        console.log(action.payload, 'getDefaultApproversByIdAction Slice');
        state.defaultApproversDetail = action.payload.data;
        state.loadingData = false;
      }
    );
    builder.addCase(addDefaultApproversAction.fulfilled, (state, action) => {
      state.defaultApprovers = state.defaultApprovers.push(action.payload.data);
      state.loadingData = false;
      console.log(action.payload, 'addDefaultApproversAction Slice');
    });
    builder
      .addCase(deleteDefaultApproversByIdAction.fulfilled, (state, action) => {
        console.log(action.payload, 'deleteDefaultApproversByIdAction Slice');
        state.defaultApproversDetail = state.defaultApprovers.filter(
          (item) => item.id !== action.payload.data.id
        );
        state.loadingData = false;
      })
      .addMatcher(isPending(...[getAllDefaultApproversAction]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[getDefaultApproversByIdAction]), (state) => {
        state.loadingData = true;
      })
      .addMatcher(isPending(...[addDefaultApproversAction]), (state) => {
        state.loadingData = true;
      })
      .addMatcher(isPending(...[deleteDefaultApproversByIdAction]), (state) => {
        state.loadingData = true;
      })
      .addMatcher(
        isRejected(
          ...[
            getAllDefaultApproversAction,
            getDefaultApproversByIdAction,
            addDefaultApproversAction,
            deleteDefaultApproversByIdAction,
          ]
        ),
        (state) => {
          state.loader = false;
          state.loadingData = false;
        }
      );
  },
});

export default approverSlice.reducer;
