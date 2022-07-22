import { createSlice } from "@reduxjs/toolkit"
import { addChartOfAccount, getAllChartOfAccount } from "./actions";

const initialState = {
   listData: []
};

export const ChartOfAccountSlice = createSlice({
   name: 'chartOfAccount',
   initialState: initialState,
   reducers: {
   },

   extraReducers: (builder) => {
      builder
         .addCase(addChartOfAccount.fulfilled, (state, { payload }) => {
            state.listData = [payload, ...state.listData];
         })
         .addCase(getAllChartOfAccount.fulfilled, (state, { payload }) => {
            state.listData = payload;
         })
   }
})

// export const {  } = taskSlice.actions
export default ChartOfAccountSlice.reducer;