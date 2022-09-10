import { createSlice, current, isPending, isRejected } from "@reduxjs/toolkit";
import { addNewTask, getAllTask, getTaskById } from "./actions";

const initialState = {
  success: false,
  taskList: {
    list: [],
    loading: false,
  },
  task: {},
  loading: false,
};

export const taskSlice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {
    clearTaskById: (state) => {
      state.task = {};
    },
    changeOnProgress: (state, { payload }) => {
      let members = state.task.members;
      members = members.map((item) => {
        if (item.memberId === payload.memberId) {
          return {
            ...item,
            progress: payload.progress,
          };
        } else {
          return item;
        }
      });
      state.task.members = members;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addNewTask.fulfilled, (state, { payload }) => {
        state.success = true;
        state.loading = false;
        state.taskList.list = [payload, ...state.taskList.list];
      })
      .addCase(getAllTask.fulfilled, (state, { payload }) => {
        state.taskList.list = payload;
        state.taskList.loading = false;
      })
      .addCase(getTaskById.fulfilled, (state, { payload }) => {
        state.task = payload;
      })
      .addMatcher(isPending(...[addNewTask]), (state) => {
        state.success = false;
        state.loading = true;
      })
      .addMatcher(isRejected(...[addNewTask]), (state) => {
        state.success = false;
        state.loading = false;
      })
      .addMatcher(isPending(...[getAllTask]), (state) => {
        state.taskList.loading = true;
      })
      .addMatcher(isRejected(...[getAllTask]), (state) => {
        state.taskList.loading = false;
      });
  },
});

export const { clearTaskById, changeOnProgress } = taskSlice.actions;
export default taskSlice.reducer;
