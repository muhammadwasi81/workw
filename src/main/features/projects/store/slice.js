import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import {
  addProject,
  getAllProjects,
  getProjectById,
  updateProject,
  getProjectStickyAction,
  getAllProjectMemberAction,
  addProjectMemberAction,
  deleteProjectMemberAction,
  saveStickyprojectAction,
} from './actions';

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
  memberData: [],
  removeMemberSucess: false,
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
      console.log(payload,"mypayload");
    },
    updateProjectById(state, { payload }) {
      state.projectDetail = state.projects.find((list) => list.id === payload);
    },
    handleComposer(state, { payload }) {
      const { isOpen, isEdit } = payload;
      state.isEditComposer = isEdit;
      state.isComposerOpen = isOpen;
    },
    addProjectMember: (state, { payload }) => {
      //TODO: replace the response with existing id object
      const projectMember = state.projects.map((item, i) => {
        if (item.id === payload[0].projectId) {
          let members = [...item.members, payload[0]];
          let newItem = {
            ...item,
            members,
          };
          return newItem;
        } else {
          return item;
        }
      });

      state.projects = projectMember;
    },
    deleteProjectMember(state, { payload }) {
      const deleteProjectMembers = state.projects.map((item, i) => {
        if (item.id === payload.id) {
          let delMember = item.members.filter(
            (member) => member.memberId !== payload.memberId
          );
          let deleteItem = {
            ...item,
            members: delMember,
          };
          return deleteItem;
        } else {
          return item;
        }
      });
      state.projects = deleteProjectMembers;
    },
    handleFavoriteProjects(state, { payload }) {
      const favProjects = state.projects.find(
        (project) => project.id === payload.id
      );
      favProjects.isPinnedPost = !favProjects.isPinnedPost;
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
      .addCase(saveStickyprojectAction.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.success = true;
        state.stickyArray = [payload.data];
      })
      .addCase(getProjectStickyAction.fulfilled, (state, { payload }) => {
        state.stickyArray = payload;
      })
      
      .addCase(getAllProjectMemberAction.fulfilled, (state, action) => {
        state.memberData = action.payload.data;
      })
      .addCase(addProjectMemberAction.fulfilled, (state, { payload }) => {
        if (payload.data.length > 0) {
          state.memberData = [...state.memberData, payload.data[0]];
          return state;
        }
      })
      .addCase(deleteProjectMemberAction.fulfilled, (state, { payload }) => {
        state.removeMemberSucess = true;
      });

    builder
      .addMatcher(isPending(...[deleteProjectMemberAction]), (state) => {
        state.removeMemberSucess = false;
      })
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
      .addMatcher(isRejected(...[deleteProjectMemberAction]), (state) => {
        state.removeMemberSucess = false;
      })
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
  deleteProjectMember,
  addProjectMember,
  handleFavoriteProjects,
} = projectSlice.actions;
export default projectSlice.reducer;
