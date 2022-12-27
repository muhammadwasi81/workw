import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode.js";
import { addELearningCategory,getELearningCategory,updateELearningCategory }
 from "./action.js";

const initialState = {
  ELearningCategory: [],
  loadingData: false,
  loader: false,
};

const eLearningCategorySlice = createSlice({
  name: "ELearningCategorys",
  initialState,
  reducers: {
    ELearningCategoryDeleted: (state, { payload }) => {
      state.ELearningCategory = state.ELearningCategory.filter((e) => e.id !== payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getELearningCategory.fulfilled, (state, { payload }) => {
        console.log(payload, "payload from SLICEEE")
        state.loadingData = false;
        state.ELearningCategory = payload;
      })
      .addCase(addELearningCategory.fulfilled, (state, { payload }) => {
        state.loader = false;
        if (payload.responseCode === responseCode.Success)
          state.ELearningCategory.push(payload.data);
      })
      .addCase(updateELearningCategory.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.ELearningCategory = state.ELearningCategory.map((x) =>
          x.id === payload.data.id ? payload.data : x
        );
      })
      .addMatcher(isPending(...[addELearningCategory, updateELearningCategory]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[getELearningCategory]), (state) => {
        state.loadingData = true;
      })
      .addMatcher(
        isRejected(...[getELearningCategory, addELearningCategory, updateELearningCategory]),
        (state) => {
          state.loader = false;
          state.loadingData = false;
        }
      );
  },
});

export const { ELearningCategoryDeleted } = eLearningCategorySlice.actions;
export default eLearningCategorySlice.reducer;
