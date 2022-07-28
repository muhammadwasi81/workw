import { createSlice, isPending } from "@reduxjs/toolkit"
import { addVoucher } from "./actions";

const initialState = {
   listData: [],
   editData: null,
   success:false,
   loader:false,
   error:false
};

export const VoucherSlice = createSlice({
   name: 'Voucher',
   initialState: initialState,
   reducers: {},

   extraReducers: (builder) => {
      builder
         .addCase(addVoucher.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.success = true;
            state.listData = [payload, ...state.listData];
         })
         .addMatcher(
				isPending(
					...[
						addVoucher
					]
				),
				state => {
					state.loader = true;
					state.success = false;
					state.error = false;
				}
			);
   }
})

export default VoucherSlice.reducer;