import { createSlice, isPending } from "@reduxjs/toolkit"
import { addMultipleEmployeeSalary, getAllEmployeeSalary, getEmployeeSalaryDetail } from "./actions";

const initialState = {
   editData: null,
   success: false,
   loader: false,
   error: false,
   salaryDetail: null,
   salaryList: [],
   loadingData: false,
};

export const VoucherSlice = createSlice({
   name: 'EmployeeSalary',
   initialState: initialState,
   reducers: {
      clearSalaryDetail: (state) => {
         state.salaryDetail = null;
      }
   },

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
            state.loadingData = false;
         })
         .addCase(getAllEmployeeSalary.fulfilled, (state, { payload }) => {
            state.salaryList = payload.data;
            state.loader = false;
            state.success = true;
         })
         .addMatcher(
            isPending(
               ...[
                  addMultipleEmployeeSalary,
                  getAllEmployeeSalary
               ]
            ),
            state => {
               state.loader = true;
               state.success = false;
               state.error = false;
               state.loadingData = true;
            }
         );
   }
})
export const { clearSalaryDetail } = VoucherSlice.actions;
export default VoucherSlice.reducer;