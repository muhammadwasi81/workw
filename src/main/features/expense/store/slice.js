import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addExpense, getAllExpense, getExpenseById } from "./actions.js";

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    loader: true,
    isSuccess: true,
    isCreateComposer: false,
    expenses: [],
    expense: {},
  },
  reducers: {
    toggleCreateComposer: (state, payload) => {
      state.isCreateComposer = !state.isCreateComposer;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addExpense.fulfilled, (state, { payload: { data } }) => {
        state.expenses.unshift(data);
        state.isCreateComposer = true;
      })
      .addCase(getAllExpense.fulfilled, (state, { payload: { data } }) => {
        state.expenses = data;
        state.loader = true;
        state.isSuccess = true;
      })
      .addCase(getExpenseById.fulfilled, (state, { payload: { data } }) => {
        state.expense = data;
        state.isSuccess = true;
      })

      .addMatcher(isPending(...[getAllExpense, getExpenseById]), (state) => {
        state.loader = true;
        state.isSuccess = true;
      })

      .addMatcher(isRejected(...[getAllExpense, getExpenseById]), (state) => {
        state.loader = false;
        state.isSuccess = false;
      });
  },
});
export const { toggleCreateComposer } = expenseSlice.actions;
export default expenseSlice.reducer;
