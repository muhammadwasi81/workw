import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  addGroup,
  getAllGroup,
  getAllProjects,
  getGroupById,
  updateGroup,
  addGroupMemberAction,
  getAllGroupMemberAction
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

};

const groupSlice = createSlice({
  name: "groupSlice",
  initialState,
  reducers: {
    resetGroupDetail(state, { payload }) {
      state.groupDetail = null;
    },
    getGroupDetailById(state, { payload }) {
      console.log(payload,"payload")
      state.groupDetail = state.groups.find(
        (list) => list.id === payload
      );
    },
    handleComposer(state, { payload }) {
      console.log(payload,"payloaddd");
      const { isOpen, isEdit } = payload;
      state.isEditComposer = isEdit;
      state.isComposerOpen = isOpen;
    },
    addMember: (state, { payload }) => {
      state.addMemberModal = payload;
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
      .addCase( addGroupMemberAction.fulfilled,(state, { payload })=>{
        console.log(payload,"payloaddd");
        state.memberData = [...state.memberData, payload];
        return state;
      })
      .addCase(getAllGroupMemberAction.fulfilled,(state,{payload})=>{
        state.memberData = payload.length>0?payload:[];
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

export const { resetGroupDetail,getGroupDetailById, handleComposer,addMember } = groupSlice.actions;
export default groupSlice.reducer;
