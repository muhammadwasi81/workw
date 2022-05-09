import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode.js";
import { addOfficeTimingGroup, getAllOfficeTimingGroups } from "./actions.js";

const initialState = {
  officeTimingGroups: [],
  loadingData: false,
  loader: false,
};

const officeTimingSlice = createSlice({
  name: "officeTimingGroup",
  initialState,
  reducers: {
    officeTimingGroupDeleted: (state, { payload }) => {
      state.officeTimingGroups = state.officeTimingGroups.filter((e) => e.id !== payload.id);
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
        if (payload.responseCode === responseCode.Success)
          state.officeTimingGroups.push(payload.data);
      })
      // .addCase(updateGrade.fulfilled, (state, { payload }) => {
      //   state.loader = false;
      //   state.grades = state.grades.map((x) =>
      //     x.id === payload.data.id ? payload.data : x
      //   );
      // })
      .addMatcher(isPending(...[addOfficeTimingGroup,]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[getAllOfficeTimingGroups]), (state) => {
        state.loadingData = true;
      })
      .addMatcher(
        isRejected(...[getAllOfficeTimingGroups, addOfficeTimingGroup]),
        (state) => {
          state.loader = false;
          state.loadingData = false;
        }
      );
  },
});

export const { officeTimingGroupDeleted } = officeTimingSlice.actions;
export default officeTimingSlice.reducer;
