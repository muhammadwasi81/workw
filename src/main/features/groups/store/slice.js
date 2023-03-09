import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  addGroup,
  getAllGroup,
  getGroupById,
  updateGroup,
  addGroupMemberAction,
  getAllGroupMemberAction,
  deleteGroupMemberAction,
  addGroupFeatures,
  getGroupFeatures,
  removeGroupFeaturesAction,
} from "./actions";

const initialState = {
  groups: [],
  groupMembers: [],
  loadingData: false,
  loader: false,
  createLoader: false,
  groupDetail: null,

  success: false,
  error: false,
  getDataLoading: false,
  memberData: [],
  isComposerOpen: false,
  isEditComposer: false,
  addMemberModal: false,
  open: false,
  drawerOpen: false,
  removeMemberSucess: false,
  groupFeatures: [],
  previousGroupDetail: {},
};

const groupSlice = createSlice({
  name: "groupSlice",
  initialState,
  reducers: {
    handleOpenComposer: (state, { payload }) => {
      state.drawerOpen = payload;
    },
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
      const favGroups = state.groups.find((group) => group.id === payload.id);
      favGroups.isPinnedPost = !favGroups.isPinnedPost;
    },
    removeGroupFeatures(state, { payload }) {
      state.groupFeatures = state.groupFeatures.filter(
        (feature) => feature.featureId !== payload.featureId
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllGroup.fulfilled, (state, { payload }) => {
        state.groups = payload.data;
        var t = [];
        // t["123"] = "123sdd";
        // t["12333213123"] = "12sss3sdd";
        payload.data.forEach((element, index) => {
          console.log(element);
          t[element.id] = element.members;
        });
        state.groupMembers = t;
        console.log(t, "sss");

        state.success = true;
        state.loader = false;
      })
      .addCase(addGroup.fulfilled, (state, { payload }) => {
        state.groups = [payload.data, ...state.groups];
        state.drawerOpen = false;
        state.createLoader = false;
        return state;
        // state.success = true;
      })
      .addCase(getGroupById.fulfilled, (state, { payload }) => {
        state.groupDetail = payload.data;
        state.loadingData = false;
        state.success = true;
      })
      .addCase(updateGroup.fulfilled, (state, { payload }) => {
        state.groupDetail = payload.data;
        // state.drawerOpen = false;
        state.isComposerOpen = false;
        state.createLoader = false;
        state.success = true;
        return state;
      })
      .addCase(addGroupMemberAction.fulfilled, (state, { payload }) => {
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
        let newMembers = state.groupDetail.members.filter(
          (member) => member.memberId !== payload
        );
        state.groupDetail = { ...state.groupDetail, members: newMembers };
      })
      .addCase(addGroupFeatures.fulfilled, (state, { payload }) => {
        // state.groupFeatures = payload.data.length > 0 ? payload.data : [];
        state.groupFeatures = payload.data;
      })
      .addCase(getGroupFeatures.fulfilled, (state, { payload }) => {
        state.groupFeatures = payload.data;
      })
      .addCase(removeGroupFeaturesAction.fulfilled, (state, { payload }) => {})
      .addMatcher(isPending(...[deleteGroupMemberAction]), (state) => {
        state.removeMemberSucess = false;
      })
      .addMatcher(isPending(...[getAllGroup]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[getGroupById]), (state) => {
        state.loadingData = true;
      })
      .addMatcher(isPending(...[addGroup, updateGroup]), (state) => {
        state.createLoader = true;
        // state.success = false;
        // state.error = false;
      })
      .addMatcher(isRejected(...[getAllGroup]), (state) => {
        state.loader = true;
      })
      .addMatcher(isRejected(...[addGroup, updateGroup]), (state) => {
        state.createLoader = false;
        state.success = false;
        state.error = false;
      })
      .addMatcher(isRejected(...[deleteGroupMemberAction]), (state) => {
        state.removeMemberSucess = false;
      })
      .addMatcher(isRejected(...[getGroupById]), (state) => {
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
  handleOpenComposer,
  handleFavoriteMark,
  removeGroupFeatures,
} = groupSlice.actions;
export default groupSlice.reducer;
