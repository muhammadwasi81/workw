import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import {
  addGroup,
  getAllGroup,
  getGroupById,
  updateGroup,
  addGroupMemberAction,
  getAllGroupMemberAction,
  deleteGroupMemberAction,
} from './actions';

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
  name: 'groupSlice',
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
    addGroupMember: (state, { payload }) => {
      //TODO: replace the response with existing id object
      console.log(payload);
      const newGroups = state.groups.map((item, i) => {
        if (item.id === payload[0].groupId) {
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

      state.groups = newGroups;
    },
    deleteGroupMember(state, { payload }) {
      state.memberData = state.memberData.filter(
        (member) => member.memberId !== payload
      );
    },
    handleFavoriteMark(state, { payload }) {
      console.log(payload, 'payload in slice');
      const favGroups = state.groups.find((group) => group.id === payload.id);
      favGroups.isPinnedPost = !favGroups.isPinnedPost;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllGroup.fulfilled, (state, { payload }) => {
        state.groups = payload.data;
        state.success = true;
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
        console.log(payload, 'group byyy');
        state.groups = state.groups.filter((group) => group.id);
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
  addGroupMember,
  handleFavoriteMark,
} = groupSlice.actions;
export default groupSlice.reducer;
