import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import {
  addProject,
  getAllProjects,
  getProjectById,
  updateProject,
  saveProjectStickyAction,
  saveStickyTitleAction,
  getProjectStickyAction,
  getAllProjectMemberAction,
  addProjectMemberAction,
  addProjectFavoriteAction,
} from './actions';

const initialState = {
  projects: [],
  isPinnedProject: false,
  loadingData: false,
  loader: true,
  success: false,
  error: false,
  projectDetail: null,
  stickyArray: [],
  isComposerOpen: false,
  isEditComposer: false,
  addMemberModal: false,
  memberData: [],
};

const projectSlice = createSlice({
  name: 'projects',
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
    deleteProjectMember(state, { payload }) {
      state.projects = state.projects.filter(
        (member) => member.id !== payload.id
      );
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
        state.loader = false;
        state.success = true;
        state.stickyArray = payload;
      })
      .addCase(getProjectStickyAction.fulfilled, (state, { payload }) => {
        state.stickyArray = payload;
      })
      .addCase(saveStickyTitleAction.fulfilled, (state, { payload }) => {
        state.stickyArray = payload;
      })
      .addCase(getAllProjectMemberAction.fulfilled, (state, action) => {
        state.memberData = action.payload.data;
      })
      .addCase(addProjectMemberAction.fulfilled, (state, { payload }) => {
        state.memberData = [...state.memberData, payload];
        return state;
      })
      .addCase(addProjectFavoriteAction.fulfilled, (state, { payload }) => {
        state.projects = state.projects.map((project) => {
          console.log('project in slice', payload.isPinnedProject);
          if (project.id === payload.id) {
            project.isPinnedProject = payload.isPinnedProject;
          }
          return project;
        });
        state.loader = false;
        state.success = true;
      });
    builder
      .addMatcher(
        isPending(
          ...[
            getAllProjects,
            addProject,
            getProjectById,
            updateProject,
            addProjectFavoriteAction,
          ]
        ),
        (state) => {
          state.loader = true;
          state.error = false;
          state.success = false;
        }
      )
      .addMatcher(
        isRejected(
          ...[
            getAllProjects,
            addProject,
            getProjectById,
            updateProject,
            addProjectFavoriteAction,
          ]
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
  deleteProjectMember,
} = projectSlice.actions;
export default projectSlice.reducer;
