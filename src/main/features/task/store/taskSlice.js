import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addNewTask, getAllTask, getTaskById } from "./actions";

const initialState = {
  success: false,
  taskList: [],
  taskdetail: null,
  loading: false,
};

export const taskSlice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addNewTask.fulfilled, (state, { payload }) => {
        state.success = true;
        state.loading = false;
        state.taskList = [payload, ...state.taskList];
      })
      .addCase(getAllTask.fulfilled, (state, { payload }) => {
        state.taskList = payload;
        state.loading = false;
      })
      .addCase(getTaskById.fulfilled, (state, { payload }) => {
        state.taskdetail = payload;
      })
      .addMatcher(
        isPending(...[addNewTask, getAllTask, getTaskById]),
        (state) => {
          state.success = false;
          state.loading = true;
        }
      )
      .addMatcher(
        isRejected(...[addNewTask, getAllTask, getTaskById]),
        (state) => {
          state.success = false;
          state.loading = false;
        }
      );
  },
});

// export const {  } = taskSlice.actions
export default taskSlice.reducer;
