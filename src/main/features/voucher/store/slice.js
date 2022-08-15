import { createSlice, isPending } from "@reduxjs/toolkit"
import { addVoucher, getAllVoucher, getLedgerReport, getVoucherDetail } from "./actions";

const initialState = {
   editData: null,
   success: false,
   loader: false,
   error: false,
   voucherDetail: null,
   voucherList:[],
   ledgerReport:null
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
            state.voucherList = [...state.voucherList, payload]
         })
         .addCase(getVoucherDetail.fulfilled, (state, { payload }) => {
            state.voucherDetail = payload;
            state.loader = false;
            state.success = true;
         })
         .addCase(getAllVoucher.fulfilled, (state, { payload }) => {
            state.voucherList = payload.data;
            state.loader = false;
            state.success = true;
         })
         .addCase(getLedgerReport.fulfilled, (state, { payload }) => {
            state.ledgerReport = payload;
            state.loader = false;
         })
         .addCase(getVoucherDetail.pending, (state, { payload }) => {
            state.voucherDetail = null;
         })
         .addMatcher(
            isPending(
               ...[ addVoucher ]
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