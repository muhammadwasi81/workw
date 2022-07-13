import { createSlice } from "@reduxjs/toolkit"
import { addNewTask } from "./actions";

const initialState = {
};

export const taskSlice = createSlice({
   name: 'task',
   initialState: initialState,
   reducers: {
   },

   extraReducers: (builder) => {
      builder
         .addCase(addNewTask.fulfilled, (state, { payload }) => {
            console.log(payload)
         })
   }
})

// export const {  } = taskSlice.actions
export default taskSlice.reducer;