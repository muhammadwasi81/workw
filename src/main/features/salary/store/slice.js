import { createSlice, isPending } from "@reduxjs/toolkit"
import { addMultipleEmployeeSalary, getAllEmployeeSalary, getEmployeeSalaryDetail } from "./actions";

const initialState = {
   editData: null,
   success: false,
   loader: false,
   error: false,
   salaryDetail: null,
   salaryList:[],
};

export const VoucherSlice = createSlice({
   name: 'EmployeeSalary',
   initialState: initialState,
   reducers: {},

   extraReducers: (builder) => {
      builder
         .addCase(addMultipleEmployeeSalary.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.success = true;
            state.salaryList = [...state.salaryList, ...payload]
         })
         .addCase(getEmployeeSalaryDetail.fulfilled, (state, { payload }) => {
            state.salaryDetail = payload;
            state.loader = false;
            state.success = true;
         })
         .addCase(getAllEmployeeSalary.fulfilled, (state, { payload }) => {
            state.salaryList = payload.data;
            state.loader = false;
            state.success = true;
         })
         .addMatcher(
            isPending(
               ...[ addMultipleEmployeeSalary ]
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