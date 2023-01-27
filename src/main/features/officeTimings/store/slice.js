import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode.js";
import {
  addOfficeTimingGroup,
  getAllOfficeTimingGroups,
  updateOfficeTimingGroupAction,
  getOfficeTimingByIdAction,
} from "./actions.js";

const initialState = {
  officeTimingGroups: [],
  loadingData: false,
  loader: false,
  drawerOpen: false,
  success: false,
  error: false,
  editData: null,
  officeTimingDetail: null,
};

const officeTimingSlice = createSlice({
  name: "officeTimingGroup",
  initialState,
  reducers: {
    handleComposer: (state, { payload }) => {
      state.editData = payload;
    },
    officeTimingGroupDeleted: (state, { payload }) => {
      state.officeTimingGroups = state.officeTimingGroups.filter(
        (e) => e.id !== payload.id
      );
    },
    handleOpenComposer: (state, { payload }) => {
      state.drawerOpen = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOfficeTimingGroups.fulfilled, (state, { payload }) => {
        state.loadingData = false;
        state.officeTimingGroups = payload.data;
      })
      .addCase(addOfficeTimingGroup.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.drawerOpen = false;
        if (payload.responseCode === responseCode.Success)
          state.officeTimingGroups.push(payload.data);
      })
      .addCase(
        updateOfficeTimingGroupAction.fulfilled,
        (state, { payload }) => {
          state.items = state.items.map((x) =>
            x.id === payload.data.id ? payload.data : x
          );
          state.success = true;
        }
      )
      .addCase(getOfficeTimingByIdAction.fulfilled, (state, { payload }) => {
        state.officeTimingDetail = payload.data;
        state.loader = false;
      })

      .addMatcher(isPending(...[addOfficeTimingGroup]), (state) => {
        state.loader = true;
        state.success = false;
        state.error = false;
      })
      .addMatcher(isPending(...[getAllOfficeTimingGroups]), (state) => {
        state.loadingData = true;
        state.success = false;
        state.error = false;
      })
      .addMatcher(
        isRejected(...[getAllOfficeTimingGroups, addOfficeTimingGroup]),
        (state) => {
          state.loader = false;
          state.loadingData = false;
          state.success = false;
          state.error = false;
        }
      );
  },
});

export const {
  officeTimingGroupDeleted,
  handleOpenComposer,
  handleComposer,
} = officeTimingSlice.actions;
export default officeTimingSlice.reducer;
