import { createSlice, isPending } from "@reduxjs/toolkit"
import { addAttendanceCheckIn, getAttendanceLastCheckIn } from "./actions";

const initialState = {
   success: false,
   loader: false,
   error: false,
   lastCheckIn: null
};

export const AttendanceSlice = createSlice({
   name: 'Attendance',
   initialState: initialState,
   reducers: {},

   extraReducers: (builder) => {
      builder
         .addCase(getAttendanceLastCheckIn.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.lastCheckIn = payload
         })
         .addCase(addAttendanceCheckIn.fulfilled, (state, { payload }) => {
            state.loader = false;
            state.success = true;
         })
         .addMatcher(
            isPending(
               ...[getAttendanceLastCheckIn]
            ),
            state => {
               state.loader = true;
               state.success = false;
               state.error = false;
            }
         );
   }
})

export default AttendanceSlice.reducer;