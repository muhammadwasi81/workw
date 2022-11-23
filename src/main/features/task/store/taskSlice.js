import { createSlice, current, isPending, isRejected } from "@reduxjs/toolkit";
import {
  addNewTask,
  getAllTask,
  getTaskById,
  cancelTaskAction,
} from "./actions";

const initialState = {
  success: false,
  taskList: {
    list: [],
    loading: false,
  },
  task: {},
  loading: false,
  drawerOpen: false,
  loadingData: false,
};

export const taskSlice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {
    handleOpenTaskComposer: (state, { payload }) => {
      state.drawerOpen = payload;
    },
    clearTaskById: (state) => {
      state.task = {};
    },
    cancelTaskSuccess: (state, { payload }) => {
      let tasks = [...state.taskList.list];
      let index = tasks.findIndex((item) => item.id === payload.taskId);
      let task = tasks.filter((item) => item.id === payload.taskId)[0];
      tasks[index] = {
        ...task,
        status: 5,
      };
      state.taskList.list = tasks;
      state.task = {
        ...task,
        status: 5,
      };
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
      let tasks = [...state.taskList.list];
      let index = tasks.findIndex((item) => item.id === payload.taskId);
      let task = tasks.filter((item) => item.id === payload.taskId)[0];
      let membersTask = task.members.map((item) => {
        if (item.memberId === payload.memberId) {
          return {
            ...item,
            progress: payload.progress,
          };
        } else return item;
      });
      task.members = membersTask;
      const memberAvg = task.members?.reduce(
        (acc, obj) => acc + obj.progress,
        0
      );
      const progress = memberAvg / task?.members?.length;
      task.progress = progress;
      tasks[index] = task;
      state.taskList.list = tasks;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addNewTask.fulfilled, (state, { payload }) => {
        state.success = true;
        state.loading = false;
        state.drawerOpen = false;
        state.taskList.list = [payload, ...state.taskList.list];
      })
      .addCase(getAllTask.fulfilled, (state, action) => {
        // state.taskList.list = payload;
        state.taskList.list = action.payload ? action.payload : [];
        state.taskList.loading = false;
      })
      .addCase(getTaskById.fulfilled, (state, { payload }) => {
        state.task = payload;
        state.loadingData = false;
      });
    builder
      // .addCase(cancelTaskAction.fulfilled, (state, action) => {
      // state.cancelTask = action.payload.data;
      // state.drawerOpen = false;
      // console.log("Cancel task", action.payload);
      // })

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
        state.loadingData = true;
      })
      .addMatcher(isRejected(...[getAllTask]), (state) => {
        state.taskList.loading = false;
      });
  },
});

export const {
  clearTaskById,
  changeOnProgress,
  handleOpenTaskComposer,
  cancelTaskSuccess,
} = taskSlice.actions;
export default taskSlice.reducer;
