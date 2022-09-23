import { createSlice, isPending } from "@reduxjs/toolkit"
import { calculateNetSalary } from "../utils/constant";
import { addPayroll, getAllPayroll, getCalculatedPayroll } from "./actions";

const initialState = {
   success: false,
   loader: false,
   error: false,
   payrollCalculatedList: null,
   payrollList: null,
   payrollDetail: null
};

export const payrollSlice = createSlice({
   name: 'Payroll',
   initialState: initialState,
   reducers: {
      handleChangePayrollItem: (state, { payload }) => {
         let { index, data } = payload;
         state.payrollCalculatedList[index] = data;
      },
      handleChangeAllPayrollItem: (state, { payload }) => {
         state.payrollCalculatedList = payload;
      },
      setPayrollDetail: (state, { payload }) => {
         state.payrollDetail = payload;
      }
   },

   extraReducers: (builder) => {
      builder
         .addCase(getCalculatedPayroll.fulfilled, (state, { payload }) => {
            state.loader = false;
            let calculatedSalaries = payload.map((item) => ({
               ...item,
               netSalary: calculateNetSalary(item),
               isChecked: true
            }))
            state.payrollCalculatedList = calculatedSalaries;
         })
         .addCase(addPayroll.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.success = true;
            state.payrollList = state.payrollList ? [...state.payrollList, payload] : [payload]
         })
         .addCase(getAllPayroll.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.payrollList = payload;
         }) 
         .addMatcher(
            isPending(
               ...[getCalculatedPayroll, addPayroll]
            ),
            state => {
               state.loader = true;
               state.success = false;
               state.error = false;
            }
         );
   }
})
export const { handleChangePayrollItem, handleChangeAllPayrollItem, setPayrollDetail } = payrollSlice.actions;
export default payrollSlice.reducer;