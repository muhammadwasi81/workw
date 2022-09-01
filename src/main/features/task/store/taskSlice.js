import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addNewTask, getAllTask, getTaskById } from "./actions";

const initialState = {
  success: false,
  taskList: [],
  taskdetail: null,
};

export const taskSlice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addNewTask.fulfilled, (state, { payload }) => {
        state.success = true;
        console.log(payload, "state.taskList");
        state.taskList = [payload, ...state.taskList];
      })
      .addCase(getAllTask.fulfilled, (state, { payload }) => {
        state.taskList = payload;
      })
      .addCase(getTaskById.fulfilled, (state, { payload }) => {
        state.taskdetail = payload;
        console.log(payload);
      })
      .addMatcher(isPending(...[addNewTask]), (state) => {
        state.success = false;
      })
      .addMatcher(isRejected(...[addNewTask]), (state) => {
        state.success = false;
      });
  },
});

// export const {  } = taskSlice.actions
export default taskSlice.reducer;
