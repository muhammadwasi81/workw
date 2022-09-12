import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode.js";
import { addGrade, getAllGrades, removeGrade, updateGrade } from "./actions.js";

const initialState = {
  grades: [],
  loadingData: false,
  loader: false,
};

const gradeSlice = createSlice({
  name: "grade",
  initialState,
  reducers: {
    gradeDeleted: (state, { payload }) => {
      state.grades = state.grades.filter((e) => e.id !== payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllGrades.fulfilled, (state, { payload }) => {
        state.loadingData = false;
        state.grades = payload.data;
      })
      .addCase(addGrade.fulfilled, (state, { payload }) => {
        state.loader = false;
        if (payload.responseCode === responseCode.Success)
          state.grades.push(payload.data);
      })
      .addCase(updateGrade.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.grades = state.grades.map((x) =>
          x.id === payload.data.id ? payload.data : x
        );
      })
      .addMatcher(isPending(...[addGrade, updateGrade]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[getAllGrades]), (state) => {
        state.loadingData = true;
      })
      .addMatcher(
        isRejected(...[getAllGrades, addGrade, updateGrade]),
        (state) => {
          state.loader = false;
          state.loadingData = false;
        }
      );
  },
});

export const { gradeDeleted } = gradeSlice.actions;
export default gradeSlice.reducer;
