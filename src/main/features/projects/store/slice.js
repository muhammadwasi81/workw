import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  addProject,
  getAllProjects,
  getProjectById,
  updateProject,
  getProjectSticky,
  getAllProjectMemberAction,
  addProjectMemberAction,
  deleteProjectMemberAction,
  saveStickyproject,
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
  isComposerOpen: false,
  isEditComposer: false,
  addMemberModal: false,
  memberData: [],
  removeMemberSucess: false,
  projectFeature: [],
  drawerOpen: false,
  projectSticky: {
    description: "",
  },
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
    // handleOpenSticky(state, { payload }) {
    //   console.log(payload, "payloaddd");
    //   let openStickyId = payload;
    //   state.openSticky = openStickyId;
    // },
    targetStickyDescription(state, { payload }) {
      const value = payload;
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
      .addCase(saveStickyproject.fulfilled, (state, { payload }) => {
        state.projectSticky = payload.data;
      })
      .addCase(getProjectSticky.fulfilled, (state, { payload }) => {
        console.log(payload.data, "payload sticky");
        //TODO: array length check will be change when they convert this array into obj
        if (payload.data.length > 0) {
          state.projectSticky = payload.data[0];
        } else {
          state.projectSticky = { description: "" };
        }
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
  targetStickyDescription,
} = projectSlice.actions;
export default projectSlice.reducer;
