import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  addGroup,
  getAllGroup,
  getAllProjects,
  getGroupById,
  updateGroup,
  addGroupMemberAction,
  getAllGroupMemberAction,
  deleteGroupMemberAction,
} from "./actions";

const initialState = {
  groups: [],
  loadingData: false,
  loader: false,
  groupDetail: null,
  success: false,
  error: false,
  getDataLoading: false,
  memberData: [],
  isComposerOpen: false,
  isEditComposer: false,
  addMemberModal: false,
  open: false,
  removeMemberSucess: false,
};

const groupSlice = createSlice({
  name: "groupSlice",
  initialState,
  reducers: {
    resetGroupDetail(state, { payload }) {
      state.groupDetail = null;
    },
    getGroupDetailById(state, { payload }) {
      state.groupDetail = state.groups.find((list) => list.id === payload);
    },
    handleComposer(state, { payload }) {
      const { isOpen, isEdit } = payload;
      state.isEditComposer = isEdit;
      state.isComposerOpen = isOpen;
    },
    addMember: (state, { payload }) => {
      state.addMemberModal = payload;
    },
    deleteGroupMember(state, { payload }) {
      console.log(payload.id, "payloaddd");
      state.memberData = state.memberData.filter(
        (member) => member.id !== payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllGroup.fulfilled, (state, { payload }) => {
        state.groups = payload.data;
        state.success = true;
        state.getDataLoading = false;
      })
      .addCase(addGroup.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.success = true;
        // state.groups.unshift(payload.data);
        state.groups = [{ ...payload }, ...state.groups];
      })
      .addCase(getGroupById.fulfilled, (state, { payload }) => {
        // state.projects = action.payload ? action.payload.data : [];
        // console.log("project by id", action.payload);
        state.groupDetail = payload.data;
        state.loader = false;
        state.success = true;
      })
      .addCase(updateGroup.fulfilled, (state, { payload }) => {
        state.groupDetail = payload.data;
        state.loader = false;
        state.success = true;
      })
      .addCase(addGroupMemberAction.fulfilled, (state, { payload }) => {
        if (payload.data.length > 0) {
          state.memberData = [...state.memberData, payload.data[0]];
          return state;
        }
      })
      .addCase(getAllGroupMemberAction.fulfilled, (state, { payload }) => {
        state.memberData = payload.data.length > 0 ? payload.data : [];
      })
      .addCase(deleteGroupMemberAction.fulfilled, (state, action) => {
        state.removeMemberSucess = true;
      })
      .addMatcher(isPending(...[deleteGroupMemberAction]), (state) => {
        state.removeMemberSucess = false;
      })
      .addMatcher(isPending(getAllGroup), (state) => {
        state.loader = true;
      })
      .addMatcher(
        isPending(...[addGroup, updateGroup, getGroupById]),
        (state) => {
          state.loader = true;
          state.success = false;
          state.error = false;
        }
      )
      .addMatcher(isRejected(...[deleteGroupMemberAction]), (state) => {
        state.removeMemberSucess = false;
      })
      .addMatcher(
        isRejected(...[getAllGroup, addGroup, updateGroup, getGroupById]),
        (state) => {
          state.loader = false;
          state.success = false;
          state.error = true;
        }
      );
  },
});

export const {
  resetGroupDetail,
  getGroupDetailById,
  handleComposer,
  addMember,
  deleteGroupMember,
} = groupSlice.actions;
export default groupSlice.reducer;
