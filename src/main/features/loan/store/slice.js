import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addLoan, getAllLoans, GetLoanById } from "./actions";

const initialState = {
  editData: null,
  loanData: [],
  success: false,
  loader: false,
  error: false,
  isCreateComposer: false,
  loanDetail: {},
  loanList: [],
};

const LoanSlice = createSlice({
  name: "loans",
  initialState,
  reducers: {
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
        state.loading = false;
      })
      .addCase(addLoan.fulfilled, (state, { payload }) => {
        if (payload.data.data) {
          state.loanList.unshift(payload.data.data);
          state.isCreateComposer = true;
        }
        // state.success = true;
        // console.log(payload);
        // state.loanList = [...state.loanList, payload.data.data];
      })
      .addMatcher(isPending(...[getAllLoans]), (state) => {
        state.loader = true;
      })
      // .addMatcher(isPending(...[GetLoanById]), (state) => {
      //   state.loanDetail = {};
      // })
      // .addMatcher(isRejected(...[GetLoanById]), (state) => {
      //   state.loanDetail = {};
      // })
      .addMatcher(isPending(...[addLoan]), (state) => {
        state.success = true;
      })
      .addMatcher(isRejected(...[addLoan]), (state) => {
        state.success = false;
      });
    //   .addMatcher(isPending(...[getAllLoans]), (state) => {
    //     state.loader = true;
    //   })
    //   .addMatcher(isRejected(...[getAllLoans]), (state) => {
    //     state.loader = true;
    //   });
  },
});

export const { toggleCreateComposer } = LoanSlice.actions;
export default LoanSlice.reducer;
