import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addResignation, getAllResignations, GetResignationById } from "./action";

const initialState = {
  items: [],
  drawerOpen: false,
  loader: false,
  detail: {},
  loadingData: false,
  createLoader: false,
};

const resignationSlice = createSlice({
  name: "resignations",
  initialState,
  reducers: {
    handleOpenComposer: (state, { payload }) => {
      state.drawerOpen = payload
    },
    cancelResignationSuccess: (state, { payload }) => {
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
  },
  extraReducers: (builder) => {
    builder.addCase(getAllResignations.fulfilled, (state, action) => {
      state.loader = false;
      state.items = action.payload ? action.payload : [];
    })

    builder.addCase(GetResignationById.fulfilled, (state, action) => {
      state.detail = action.payload.data;
      state.loadingData = false;
    })

    builder
      .addCase(addResignation.fulfilled, (state, { payload }) => {
        state.drawerOpen = false
        state.success = true
        state.createLoader = false
        state.items = [payload.data.data, ...state.items];
        console.log("sliceresignationn",payload);
      })
      .addMatcher(isPending(...[getAllResignations]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[GetResignationById]), (state) => {
        state.loadingData = true;
      })
      .addMatcher(isPending(...[addResignation]), (state) => {
        state.createLoader = true;
      })
      .addMatcher(isRejected(...[getAllResignations]), (state) => {
        state.loader = false;
      })
      .addMatcher(isRejected(...[addResignation]), (state) => {
        state.createLoader = false;
      });
  },


});

export const { handleOpenComposer, cancelResignationSuccess } = resignationSlice.actions;
export default resignationSlice.reducer;
