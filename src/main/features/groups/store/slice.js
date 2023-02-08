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
      const deleteGroupMembers = state.groups.map((item, i) => {
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
      state.groups = deleteGroupMembers;
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
        state.loadingData = false;
      })
      .addCase(addGroup.fulfilled, (state, { payload }) => {
        state.groups = [...payload, ...state.groups];
        // state.groups.unshift(payload);

        state.loader = false;
        state.success = true;
      })
      .addCase(getGroupById.fulfilled, (state, { payload }) => {
        state.groupDetail = payload.data;
        state.loadingData = false;
        state.success = true;
      })
      .addCase(updateGroup.fulfilled, (state, { payload }) => {
        state.groupDetail = payload.data;
        state.loader = false;
        state.success = true;
      })
      .addCase(addGroupMemberAction.fulfilled, (state, { payload }) => {
        // state.groups = state.groups.filter((group) => group.id);
        // if (payload.data.length > 0) {
        //   state.memberData = [...state.memberData, payload.data[0]];
        //   return state;
        // }

        if (state.groupDetail) {
          //TODO: check if response is empty
          if (payload.data?.length) {
            let newMembers = [...state.groupDetail.members, payload.data[0]];
            state.groupDetail = {
              ...state.groupDetail,
              members: newMembers,
            };
          }
        }
      })
      .addCase(getAllGroupMemberAction.fulfilled, (state, { payload }) => {
        state.memberData = payload.data.length > 0 ? payload.data : [];
      })
      .addCase(deleteGroupMemberAction.fulfilled, (state, { payload }) => {
        // if (state.groupDetail) {
        console.log(payload, "payload in iff");

        let newMembers = state.groupDetail.members.filter(
          (member) => member.memberId !== payload
        );

        state.groupDetail = { ...state.groupDetail, members: newMembers };
      })
      .addMatcher(isPending(...[deleteGroupMemberAction]), (state) => {
        state.removeMemberSucess = false;
      })
      .addMatcher(isPending(getAllGroup), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[addGroup]), (state) => {
        state.loader = true;
        state.success = false;
        state.error = false;
      })
      .addMatcher(isRejected(...[addGroup]), (state) => {
        state.loader = false;
        state.success = false;
      })
      .addMatcher(isRejected(...[deleteGroupMemberAction]), (state) => {
        state.removeMemberSucess = false;
      })
      .addMatcher(isRejected(...[updateGroup, getGroupById]), (state) => {
        state.loader = false;
        state.success = false;
        state.error = true;
      });
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
