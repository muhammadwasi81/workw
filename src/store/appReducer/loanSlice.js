import { createSlice } from "@reduxjs/toolkit";

export const loanSlice = createSlice({
  name: "loanSlice",
  initialState: {
    listItem: false,
  },
  reducers: {
    GetLoanById: (state, action) => {
      const id = action.payload;
      console.log(id);
      state.listItem = true;
    },
    CloseDetailView: (state) => {
      state.listItem = false;
    },
  },
});

export const { GetLoanById, CloseDetailView } = loanSlice.actions;
export default loanSlice.reducer;
