import { createSlice } from "@reduxjs/toolkit"
import { addChartOfAccount, getAllChartOfAccount } from "./actions";

const initialState = {
   listData: [],
   editData: null,
};

export const ChartOfAccountSlice = createSlice({
   name: 'chartOfAccount',
   initialState: initialState,
   reducers: {
      handleEdit: (state, { payload }) => {
         console.log(payload, "PAYLOAD")
			state.editData = payload
		}
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

export const { handleEdit } = ChartOfAccountSlice.actions
export default ChartOfAccountSlice.reducer;