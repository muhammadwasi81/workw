import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  addProject,
  getAllProjects,
  getProjectById,
  updateProject,
  saveProjectStickyAction,
  saveStickyTitleAction,
  getProjectStickyAction,
} from "./actions";

const initialState = {
  projects: [],
  loadingData: false,
  loader: true,
  success: false,
  error: false,
  projectDetail: null,
  stickyArray: [],
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    resetProjectDetail(state, { payload }) {
      state.projectDetail = null;
    },
    targetTitleVal: (state, action) => {
      const val = action.payload;

      const listObj = state.stickyArray.find((list) => list.id === val.id);
      listObj.title = val.value;
      console.log(listObj.title, "titleeee");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.projects = action.payload ? action.payload.data : [];
        state.loader = false;
        state.success = true;
      })
      .addCase(addProject.fulfilled, (state, { payload }) => {
        console.log("add project", payload);
        state.projects.unshift(payload.data);
        state.loader = false;
        state.success = true;
      })
      .addCase(getProjectById.fulfilled, (state, { payload }) => {
        state.projectDetail = payload.data;
        state.loader = false;
        state.success = true;
      })
      .addCase(updateProject.fulfilled, (state, { payload }) => {
        state.projectDetail = payload.data;
        state.loader = false;
        state.success = true;
      })
      .addCase(saveProjectStickyAction.fulfilled, (state, { payload }) => {
        console.log(payload, "description");
        state.loader = false;
        state.success = true;
        state.stickyArray = payload;
        console.log(payload, "payloadd");
        console.log(state.stickyArray, "sticky array");
      })
      .addCase(getProjectStickyAction.fulfilled, (state, { payload }) => {
        state.stickyArray = payload;
        console.log(payload, "payload");
      })
      .addCase(saveStickyTitleAction.fulfilled, (state, { payload }) => {
        state.stickyArray = payload;
      });
    builder
      .addMatcher(
        isPending(
          ...[getAllProjects, addProject, getProjectById, updateProject]
        ),
        (state) => {
          state.loader = true;
          state.error = false;
          state.success = false;
        }
      )
      .addMatcher(
        isRejected(
          ...[getAllProjects, addProject, getProjectById, updateProject]
        ),
        (state) => {
          state.loader = false;
          state.error = true;
          state.success = false;
        }
      );
  },
});

export const { resetProjectDetail, targetTitleVal } = projectSlice.actions;
export default projectSlice.reducer;
