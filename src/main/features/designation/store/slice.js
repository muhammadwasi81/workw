import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode.js";
import {
  addDesignation,
  getAllDesignation,
  removeDesignation,
  updateDesignation,
} from "./actions.js";

const initialState = {
  designations: [],
  loadingData: false,
  loader: false,
  success: false,
  error: false,
};

const designationSlice = createSlice({
  name: "designations",
  initialState,
  reducers: {
    designationDeleted: (state, { payload }) => {
      state.designations = state.designations.filter(
        (e) => e.id !== payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDesignation.fulfilled, (state, { payload }) => {
        state.loadingData = false;
        state.designations = payload.data;
      })
      .addCase(addDesignation.fulfilled, (state, { payload }) => {
        state.loader = false;
        if (payload.responseCode === responseCode.Success)
          state.designations.push(payload.data);
      })
      .addCase(updateDesignation.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.designations = state.designations.map((x) =>
          x.id === payload.data.id ? payload.data : x
        );
        console.log(state.designations);
      })
      .addCase(removeDesignation.fulfilled, (state, { payload }) => {
        console.log(payload, "payload");
        state.loader = false;
        state.designations = state.designations.filter(
          (x) => x.id !== payload.data.id
        );
      })
      .addMatcher(
        isPending(...[addDesignation, updateDesignation]),
        (state) => {
          state.loader = true;
          state.success = false;
          state.error = false;
        }
      )
      .addMatcher(isPending(...[getAllDesignation]), (state) => {
        state.loadingData = true;
        state.success = false;
        state.error = false;
      })
      .addMatcher(
        isRejected(...[getAllDesignation, addDesignation, updateDesignation]),
        (state) => {
          state.loader = false;
          state.loadingData = false;
          state.success = false;
          state.error = false;
        }
      );
  },
});

export const { designationDeleted } = designationSlice.actions;
export default designationSlice.reducer;
