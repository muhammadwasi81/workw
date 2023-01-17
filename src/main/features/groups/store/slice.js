import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  addGroup,
  getAllGroup,
  getAllProjects,
  getGroupById,
  updateGroup,
} from "./actions";

const initialState = {
  groups: [],
  loadingData: false,
  loader: false,
  groupDetail: null,
  success: false,
  error: false,
  getDataLoading: false,
};

const groupSlice = createSlice({
  name: "groupSlice",
  initialState,
  reducers: {
    resetGroupDetail(state, { payload }) {
      state.groupDetail = null;
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

export const { resetGroupDetail } = groupSlice.actions;
export default groupSlice.reducer;
