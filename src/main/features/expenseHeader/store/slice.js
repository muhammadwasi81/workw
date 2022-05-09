import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode.js";
import { addExpense, getAllExpense, removeExpense, updateExpense } from "./actions.js";

const initialState = {
  expenseHeaders: [],
  loadingData: false,
  loader: false,
};

const expenseHeaederSlice = createSlice({
  name: "ExpenseHeader",
  initialState,
  reducers: {
    expenseDeleted: (state, { payload }) => {
      state.expenseHeaders = state.expenseHeaders.filter((e) => e.id !== payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllExpense.fulfilled, (state, { payload }) => {
        state.loadingData = false;
        state.expenseHeaders = payload.data;
      })
      .addCase(addExpense.fulfilled, (state, { payload }) => {
        state.loader = false;
        if (payload.responseCode === responseCode.Success)
          state.expenseHeaders.push(payload.data);
      })
      .addCase(updateExpense.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.expenseHeaders = state.expenseHeaders.map((x) =>
          x.id === payload.data.id ? payload.data : x
        );
      })
      .addMatcher(isPending(...[addExpense, updateExpense]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[getAllExpense]), (state) => {
        state.loadingData = true;
      })
      .addMatcher(
        isRejected(...[getAllExpense, addExpense, updateExpense]),
        (state) => {
          state.loader = false;
          state.loadingData = false;
        }
      );
  },
});

export const { expenseDeleted } = expenseHeaederSlice.actions;
export default expenseHeaederSlice.reducer;
