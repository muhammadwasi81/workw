import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
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
  deleteProjectMemberAction,
  addProjectFeature,
  getProjectFeature,
  removeProjectFeature,
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
  memberData: [],
  removeMemberSucess: false,
  projectFeature: [],
  drawerOpen: false,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    handleOpenComposer: (state, { payload }) => {
      state.drawerOpen = payload;
    },
    resetProjectDetail(state, { payload }) {
      state.projectDetail = null;
    },
    addMember: (state, { payload }) => {
      state.addMemberModal = payload;
      console.log(payload, "mypayload");
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
    deleteProjectFeature(state, { payload }) {
      state.projectFeature = state.projectFeature.filter(
        (feature) => feature.featureId !== payload.featureId
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
        state.drawerOpen = false;
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
        state.drawerOpen = false;
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
        if (state.projectDetail) {
          if (payload.data?.length) {
            let newMembers = [...state.projectDetail.members, payload.data[0]];
            state.projectDetail = {
              ...state.projectDetail,
              members: newMembers,
            };
          }
        }
      })
      .addCase(deleteProjectMemberAction.fulfilled, (state, { payload }) => {
        let newMembers = state.projectDetail.members.filter(
          (member) => member.memberId !== payload
        );

        state.projectDetail = { ...state.projectDetail, members: newMembers };
        // state.removeMemberSucess = true;
      })
      .addCase(addProjectFeature.fulfilled, (state, { payload }) => {
        state.projectFeature = payload.data;
      })
      .addCase(getProjectFeature.fulfilled, (state, { payload }) => {
        state.projectFeature = payload.data;
      })
      .addCase(removeProjectFeature.fulfilled, (state, { payload }) => {});
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
  handleOpenComposer,
  resetProjectDetail,
  updateProjectById,
  handleComposer,
  addMember,
  deleteProjectMember,
  addProjectMember,
  handleFavoriteProjects,
  deleteProjectFeature,
} = projectSlice.actions;
export default projectSlice.reducer;
