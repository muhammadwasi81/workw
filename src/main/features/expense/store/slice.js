import { createSlice, current, isPending, isRejected } from "@reduxjs/toolkit";
import { addExpense, getAllExpense, getExpenseById } from "./actions.js";

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    loader: false,
    success: false,
    loadingData: false,
    isCreateComposer: false,
    expenses: [],
    expenseDetail: null,
    expense: {},
    drawerOpen: false,
  },
  reducers: {
    handleOpenExpenseComposer: (state, { payload }) => {
      state.drawerOpen = payload;
    },
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
      .addCase(addExpense.fulfilled, (state, { payload }) => {
        state.expenses = [payload, ...state.expenses];

        state.drawerOpen = false;
        state.loader = false;
      })
      .addCase(getAllExpense.fulfilled, (state, action) => {
        // state.expenses = action.payload;
        // state.loader = false;
        // console.log(action.payload, "payload");
        state.expenses = action.payload.data ? action.payload.data : [];
        state.loader = false;
      })
      .addCase(getExpenseById.fulfilled, (state, action) => {
        // state.expense = data;
        state.expense = action.payload?.data;
        state.loadingData = false;
      })

      .addMatcher(isPending(...[getAllExpense]), (state) => {
        state.expenses = [];
        state.loader = true;
        state.loadingData = true;
      })
      .addMatcher(isPending(...[getExpenseById]), (state) => {
        state.expense = {};
      })
      .addMatcher(isPending(...[addExpense]), (state) => {
        state.loader = true;
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
  handleOpenExpenseComposer,
} = expenseSlice.actions;
export default expenseSlice.reducer;
