import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addLoan, getAllLoans, GetLoanById } from "./actions";

const initialState = {
  editData: null,
  loanData: [],
  success: false,
  loader: false,
  error: false,
  loanDetail: null,
  loanList: [],
};

const LoanSlice = createSlice({
  name: "loans",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllLoans.fulfilled, (state, { payload }) => {
        // console.log("****************", payload);
        state.loanList = payload ? payload : [];
        state.loader = false;
        state.success = true;
      })
      .addCase(GetLoanById.fulfilled, (state, { payload }) => {
        console.log("getLoanById payload", payload.data);
        state.loanDetail = payload.data;
      })
      .addCase(addLoan.fulfilled, (state, { payload }) => {
        console.log(payload);
      })
      .addMatcher(isPending(...[getAllLoans]), (state) => {
        state.loader = true;
      });
    //   .addMatcher(isPending(...[getAllLoans]), (state) => {
    //     state.loader = true;
    //   })
    //   .addMatcher(isRejected(...[getAllLoans]), (state) => {
    //     state.loader = true;
    //   });
  },
});

export const {} = LoanSlice.actions;
export default LoanSlice.reducer;
