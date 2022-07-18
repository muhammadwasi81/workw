import { createSlice } from "@reduxjs/toolkit"
import { addNewTask, getAllTask } from "./actions";

const initialState = {
};

export const taskSlice = createSlice({
   name: 'task',
   initialState: initialState,
   taskList:[],
   reducers: {
   },

   extraReducers: (builder) => {
      builder
         .addCase(addNewTask.fulfilled, (state, { payload }) => {
            state.taskList = [payload, ...state.taskList];
         })
         .addCase(getAllTask.fulfilled, (state, { payload }) => {
            state.taskList = payload;
         })
   }
})

// export const {  } = taskSlice.actions
export default taskSlice.reducer;