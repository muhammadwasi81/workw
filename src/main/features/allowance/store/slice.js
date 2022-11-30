import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import { responseCode } from '../../../../services/enums/responseCode.js';
import { addAllowance, getAllAllowance, updateAllowance } from './actions.js';

const initialState = {
  allowances: [],
  loadingData: false,
  loader: false,
};

const allowanceSlice = createSlice({
  name: 'grade',
  initialState,
  reducers: {
    allowanceDeleted: (state, { payload }) => {
      state.allowances = state.allowances.filter((e) => e.id !== payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAllowance.fulfilled, (state, { payload }) => {
        state.loadingData = false;
        state.allowances = payload.data;
      })
      .addCase(addAllowance.fulfilled, (state, { payload }) => {
        console.log(payload, 'addAllowance');
        state.loader = false;
        if (payload.responseCode === responseCode.Success)
          state.allowances.push(payload.data);
      })
      .addCase(updateAllowance.fulfilled, (state, { payload }) => {
        console.log(payload, 'updateAllowance');
        state.loader = false;
        state.allowances = state.allowances.map((e) =>
          e.id === payload.data.id ? payload.data : e
        );
      })
      .addMatcher(isPending(...[addAllowance, updateAllowance]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[getAllAllowance]), (state) => {
        state.loadingData = true;
      })
      .addMatcher(
        isRejected(...[getAllAllowance, addAllowance, updateAllowance]),
        (state) => {
          state.loader = false;
          state.loadingData = false;
        }
      );
  },
});

export const { allowanceDeleted } = allowanceSlice.actions;
export default allowanceSlice.reducer;
