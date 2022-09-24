import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../../services/enums/responseCode.js";
import { addDefaultHiringCriteria, getAllDefaultHiringCriteria, updateDefaultHiringCriteria } from "./actions.js";

const initialState = {
  questions: [],
  loadingData: false,
  loader: false,
};

const defaultHiringCriteriaSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    DefaultHiringCriteriaDeleted: (state, { payload }) => {
      state.questions = state.questions.filter((e) => e.id !== payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDefaultHiringCriteria.fulfilled, (state, { payload }) => {
        state.loadingData = false;
        state.questions = payload.data;
      })
      .addCase(addDefaultHiringCriteria.fulfilled, (state, { payload }) => {
        state.loader = false;
        if (payload.responseCode === responseCode.Success)
          state.questions.push(payload.data);
      })
      .addCase(updateDefaultHiringCriteria.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.questions = state.questions.map((x) =>
          x.id === payload.data.id ? payload.data : x
        );
      })
      .addMatcher(isPending(...[addDefaultHiringCriteria, updateDefaultHiringCriteria]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[getAllDefaultHiringCriteria]), (state) => {
        state.loadingData = true;
      })
      .addMatcher(
        isRejected(...[getAllDefaultHiringCriteria, addDefaultHiringCriteria, updateDefaultHiringCriteria]),
        (state) => {
          state.loader = false;
          state.loadingData = false;
        }
      );
  },
});

export const { DefaultHiringCriteriaDeleted } = defaultHiringCriteriaSlice.actions;
export default defaultHiringCriteriaSlice.reducer;
