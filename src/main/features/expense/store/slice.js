import { createSlice, current, isPending, isRejected } from "@reduxjs/toolkit";
import { addExpense, getAllExpense, getExpenseById } from "./actions.js";

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    loader: true,
    isCreateComposer: false,
    expenses: [],
    expense: {},
  },
  reducers: {
    toggleCreateComposer: (state, payload) => {
      state.isCreateComposer = !state.isCreateComposer;
    },
    clearExpense: (state) => {
      state.expense = {};
    },
    updateListExpenseStatus: (state, { payload }) => {
      state.expenses = current(state.expenses).map((item) => {
        if (item.id === payload.id) {
          return {
            ...item,
            status: payload.status,
          };
        } else {
          return item;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addExpense.fulfilled, (state, { payload: { data } }) => {
        if (data) {
          state.expenses.unshift(data);
          state.isCreateComposer = true;
        }
      })
      .addCase(getAllExpense.fulfilled, (state, { payload: { data } }) => {
        state.expenses = data;
        state.loader = false;
      })
      .addCase(getExpenseById.fulfilled, (state, { payload: { data } }) => {
        state.expense = data;
      })
      .addMatcher(isPending(...[getAllExpense]), (state) => {
        state.expenses = [];
        state.loader = true;
      })
      .addMatcher(isPending(...[getExpenseById]), (state) => {
        state.expense = {};
      })
      .addMatcher(isRejected(...[getExpenseById]), (state) => {
        state.expense = {};
      })
      .addMatcher(isRejected(...[getExpenseById]), (state) => {
        state.loader = false;
      });
  },
});
export const {
  toggleCreateComposer,
  clearExpense,
  updateListExpenseStatus,
} = expenseSlice.actions;
export default expenseSlice.reducer;
