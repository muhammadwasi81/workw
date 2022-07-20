import { createSlice } from "@reduxjs/toolkit"
import { addNewTask, getAllTask, getTaskById } from "./actions";

const initialState = {
};

export const taskSlice = createSlice({
   name: 'task',
   initialState: initialState,
   taskList: [],
   taskdetail: null,
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
         .addCase(getTaskById.fulfilled, (state, { payload }) => {
            state.taskdetail = payload;;
            console.log(payload)
         })
   }
})

// export const {  } = taskSlice.actions
export default taskSlice.reducer;