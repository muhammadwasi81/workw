import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  addChartOfAccount,
  getAllChartOfAccount,
  updateChartOfAccount,
} from "./actions";

const initialState = {
  listData: [],
  editData: null,
  success: false,
  loader: false,
  error: false,
  createLoader: false,
};

export const ChartOfAccountSlice = createSlice({
  name: "chartOfAccount",
  initialState: initialState,
  reducers: {
    handleEdit: (state, { payload }) => {
      state.editData = payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addChartOfAccount.fulfilled, (state, { payload }) => {
        state.createLoader = false;
        state.success = true;
        state.listData = [payload, ...state.listData];
      })
      .addCase(updateChartOfAccount.fulfilled, (state, { payload }) => {
        state.editData = null;
        state.createLoader = false;
        state.success = true;
        let tempListData = [...state.listData];
        tempListData.splice(
          tempListData.findIndex((it) => it.id === payload.id),
          1,
          payload
        );
        state.listData = tempListData;
      })
      .addCase(getAllChartOfAccount.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.listData = payload;
      })
      .addMatcher(isPending(...[addChartOfAccount]), (state) => {
        state.createLoader = true;
        state.success = false;
        state.error = false;
      })
      .addMatcher(isPending(...[getAllChartOfAccount]), (state) => {
        state.loader = true;
        state.success = false;
        state.error = false;
      })
      .addMatcher(
        isRejected(
          ...[addChartOfAccount, getAllChartOfAccount, updateChartOfAccount]
        ),
        (state) => {
          state.loader = false;
          state.createLoader = false;
          state.success = false;
          state.error = false;
        }
      );
  },
});

export const { handleEdit } = ChartOfAccountSlice.actions;
export default ChartOfAccountSlice.reducer;
