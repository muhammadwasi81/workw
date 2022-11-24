import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addLoan, getAllLoans, GetLoanById } from "./actions";

const initialState = {
  editData: null,
  loanData: [],
  success: false,
  loader: false,
  error: false,
  drawerOpen: false,
  createLoader: false,
  isCreateComposer: false,
  loanDetail: {},
  loanList: [],
  loadingData: false,
};

const LoanSlice = createSlice({
  name: "loans",
  initialState,
  reducers: {
    handleOpenComposer: (state, { payload }) => {
      state.drawerOpen = payload;
    },
    toggleCreateComposer: (state, payload) => {
      state.isCreateComposer = !state.isCreateComposer;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllLoans.fulfilled, (state, { payload }) => {
        // console.log("****************", payload);
        state.loanList = payload ? payload : [];
        state.loader = false;
        // state.success = true;
      })
      .addCase(GetLoanById.fulfilled, (state, { payload }) => {
        console.log("getLoanById payload", payload.data);
        state.loanDetail = payload.data;
        state.loader = false;
        state.loadingData = false;
      })
      .addCase(addLoan.fulfilled, (state, { payload }) => {
        console.log("add loan slice ", payload.data);
        state.loanList.unshift(payload.data);
        state.createLoader = false;
        state.success = true;
        state.isCreateComposer = false;
        // if (payload.data.length > 1) {
        //   state.loanList.unshift(payload.data);
        //   state.createLoader = false;
        //   state.success = true;
        //   state.isCreateComposer = false;
        // }
      })
      .addMatcher(isPending(...[getAllLoans]), (state) => {
        state.loader = true;
      })

      .addMatcher(isPending(...[addLoan]), (state) => {
        state.createLoader = true;
      })
      .addMatcher(isPending(...[GetLoanById]), (state) => {
        state.loadingData = true;
      })
      .addMatcher(isRejected(...[addLoan]), (state) => {
        state.success = false;
      })
      .addMatcher(isPending(...[addLoan]), (state) => {
        state.createLoader = true;
      });
  },
});

export const { toggleCreateComposer, handleOpenComposer } = LoanSlice.actions;
export default LoanSlice.reducer;
