import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode.js";
import {
  addJobDescription,
  getAllJobDescription,
  updateJobDescription,
  removeJobDescription,
} from "./actions.js";

const initialState = {
  jobDescriptions: [],
  loadingData: false,
  loader: false,
};

const jobDescriptionSlice = createSlice({
  name: "jobDescription",
  initialState,
  reducers: {
    JobDescriptionDeleted: (state, action) => {
      const id = action.payload.id;

      state.jobDescriptions = state.jobDescriptions.filter(
        (list) => list.id !== id
      );
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
      .addCase(removeJobDescription.fulfilled, (state) => {
        state.loader = false;
        state.success = true;
      })
      .addMatcher(
        isPending(...[addJobDescription, updateJobDescription]),
        (state) => {
          state.loader = true;
        }
      )
      .addMatcher(isPending(...[getAllJobDescription]), (state) => {
        state.loadingData = true;
      })
      .addMatcher(
        isRejected(
          ...[getAllJobDescription, addJobDescription, updateJobDescription]
        ),
        (state) => {
          state.loader = false;
          state.loadingData = false;
        }
      );
  },
});

export const { jobDescriptionDeleted } = jobDescriptionSlice.actions;
export default jobDescriptionSlice.reducer;
