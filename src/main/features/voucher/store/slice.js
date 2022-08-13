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
            console.log("Test")
            state.loader = false;
            state.success = true;
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