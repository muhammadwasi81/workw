import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  addProject,
  getAllProjects,
  getProjectById,
  updateProject,
  saveProjectStickyAction,
  saveStickyTitleAction,
  getProjectStickyAction,
  getAllProjectMemberAction,addProjectMemberAction
} from "./actions";

const initialState = {
  projects: [],
  loadingData: false,
  loader: true,
  success: false,
  error: false,
  projectDetail: null,
  stickyArray: [],
  isComposerOpen: false,
  isEditComposer: false,
  addMemberModal: false,
  memberData:[],
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    resetProjectDetail(state, { payload }) {
      state.projectDetail = null;
    },
    addMember: (state, { payload }) => {
      state.addMemberModal = payload;
    },
    updateProjectById(state, { payload }) {
      state.projectDetail = state.projects.find((list) => list.id === payload);
    },
    handleComposer(state, { payload }) {
      const { isOpen, isEdit } = payload;
      state.isEditComposer = isEdit;
      state.isComposerOpen = isOpen;
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
      })
      .addCase(getAllProjectMemberAction.fulfilled,(state,action)=>{
        console.log(action.payload,"payloadd");
        state.memberData = action.payload.data;
        console.log(state.memberData,"payloadd");

      })
      .addCase(addProjectMemberAction.fulfilled,(state,{payload})=>{
        state.memberData = [...state.memberData, payload];
        return state;
      })
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

export const {
  resetProjectDetail,
  updateProjectById,
  handleComposer,
  addMember,
} = projectSlice.actions;
export default projectSlice.reducer;
