import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode.js";
import { addJobDescription, getAllJobDescription, removeGrade, updateJobDescription } from "./actions.js";

const initialState = {
  jobDescriptions: [],
  loadingData: false,
  loader: false,
};

const jobDescriptionSlice = createSlice({
  name: "jobDescription",
  initialState,
  reducers: {
    JobDescriptionDeleted: (state, { payload }) => {
      state.jobDescriptions = state.jobDescriptions.filter((e) => e.id !== payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobDescription.fulfilled, (state, { payload }) => {
        state.loadingData = false;
        state.jobDescriptions = payload.data;
      })
      .addCase(addJobDescription.fulfilled, (state, { payload }) => {
        state.loader = false;
        if (payload.responseCode === responseCode.Success)
          state.jobDescriptions.push(payload.data);
      })
      .addCase(updateJobDescription.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.jobDescriptions = state.jobDescriptions.map((x) =>
          x.id === payload.data.id ? payload.data : x
        );
      })
      .addMatcher(isPending(...[addJobDescription, updateJobDescription]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[getAllJobDescription]), (state) => {
        state.loadingData = true;
      })
      .addMatcher(
        isRejected(...[getAllJobDescription, addJobDescription, updateJobDescription]),
        (state) => {
          state.loader = false;
          state.loadingData = false;
        }
      );
  },
});

export const { jobDescriptionDeleted } = jobDescriptionSlice.actions;
export default jobDescriptionSlice.reducer;
