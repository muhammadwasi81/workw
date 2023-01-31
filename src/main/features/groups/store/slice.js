import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import {
  addGroup,
  getAllGroup,
  getAllProjects,
  getGroupById,
  updateGroup,
  addGroupMemberAction,
  getAllGroupMemberAction,
  addGroupFavoriteMarkAction,
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
};

const groupSlice = createSlice({
  name: 'groupSlice',
  initialState,
  reducers: {
    resetGroupDetail(state, { payload }) {
      state.groupDetail = null;
    },
    getGroupDetailById(state, { payload }) {
      console.log(payload, 'payload');
      state.groupDetail = state.groups.find((list) => list.id === payload);
    },
    handleComposer(state, { payload }) {
      // console.log(payload, 'payload');
      const { isOpen, isEdit } = payload;
      state.isEditComposer = isEdit;
      state.isComposerOpen = isOpen;
    },
    addMember: (state, { payload }) => {
      state.addMemberModal = payload;
    },
    deleteGroupMember(state, { payload }) {
      state.memberData = state.memberData.filter(
        (member) => member.id !== payload.id
      );
    },
    handleFavoriteMark(state, { payload }) {
      console.log(payload, 'payload in slice');
      const favGroups = state.groups.find((group) => group.id === payload.id);
      favGroups.isFavorite = !payload.isFavorite;
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
        console.log(payload, 'payloaddd');
        state.memberData = [...state.memberData, payload.data];
        return state;
      })
      .addCase(getAllGroupMemberAction.fulfilled, (state, { payload }) => {
        state.memberData = payload.data;
      })
      .addCase(addGroupFavoriteMarkAction.fulfilled, (state, { payload }) => {
        state.groups = state.groups.map((group) => {
          if (group.id === payload.data.id) {
            group.isFavorite = payload.data.isFavorite;
          }
          return group;
        });
      })
      .addMatcher(isPending(getAllGroup), (state) => {
        state.getDataLoading = true;
      })
      .addMatcher(
        isPending(...[addGroup, updateGroup, getGroupById]),
        (state) => {
          state.loader = true;
          state.success = false;
          state.error = false;
        }
      )
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
  handleFavoriteMark,
} = groupSlice.actions;
export default groupSlice.reducer;
