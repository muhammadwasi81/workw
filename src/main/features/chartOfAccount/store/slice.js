import { createSlice, isPending, isRejected } from "@reduxjs/toolkit"
import { addChartOfAccount, getAllChartOfAccount, updateChartOfAccount } from "./actions";

const initialState = {
   listData: [],
   editData: null,
   success:false,
   loader:false,
   error:false
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
            state.loader = false;
            state.success = true;
            state.listData = [payload, ...state.listData];
         })
         .addCase(updateChartOfAccount.fulfilled, (state, { payload }) => {
            console.log(payload, "PAYLOAD HERE")
            state.editData = null;
            state.loader = false;
            state.success = true;
            let tempListData = [...state.listData];
            tempListData.splice(
               tempListData.findIndex(it=>it.id === payload.id),
               1,
               payload
               );
               state.listData = tempListData;
         })
         .addCase(getAllChartOfAccount.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.listData = payload;
         })
         .addMatcher(
				isPending(
					...[ addChartOfAccount,
                  getAllChartOfAccount,
                  updateChartOfAccount ]
				),
				state => {
					state.loader = true;
					state.success = false;
					state.error = false;
				}
			)
         .addMatcher(
				isRejected(
					...[ addChartOfAccount,
                  getAllChartOfAccount,
                  updateChartOfAccount ]
				),
				state => {
					state.loader = true;
					state.success = false;
					state.error = false;
				}
			);
   }
})

export const { handleEdit } = ChartOfAccountSlice.actions
export default ChartOfAccountSlice.reducer;