import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode.js";
import { addQuestion, getAllQuestion, removeQuestion, updateQuestion } from "./actions.js";

const initialState = {
  appraisals: [],
  loadingData: false,
  loader: false,
};

const appraisalSlice = createSlice({
  name: "Appraisal",
  initialState,
  reducers: {
    appraisalDeleted: (state, { payload }) => {
      state.appraisals = state.appraisals.filter((e) => e.id !== payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllQuestion.fulfilled, (state, { payload }) => {
        state.loadingData = false;
        state.appraisals = payload.data;
      })
      .addCase(addQuestion.fulfilled, (state, { payload }) => {
        state.loader = false;
        if (payload.responseCode === responseCode.Success)
          state.appraisals.push(payload.data);
      })
      .addCase(updateQuestion.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.appraisals = state.appraisals.map((x) =>
          x.id === payload.data.id ? payload.data : x
        );
      })
      .addMatcher(isPending(...[addQuestion, updateQuestion]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[getAllQuestion]), (state) => {
        state.loadingData = true;
      })
      .addMatcher(
        isRejected(...[getAllQuestion, addQuestion, updateQuestion]),
        (state) => {
          state.loader = false;
          state.loadingData = false;
        }
      );
  },
});

export const { appraisalDeleted } = appraisalSlice.actions;
export default appraisalSlice.reducer;
