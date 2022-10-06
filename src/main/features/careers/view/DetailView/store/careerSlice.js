import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../../../services/enums/responseCode.js";
import { getAllCareerAction } from "./action.js";

const initialState = {
  careerList: [],
};
const careerSlice = createSlice({
  name: "salaryHeader",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getAllCareerAction.fulfilled, (state, { payload }) => {
      state.careerList = payload.data;
    });
  },
});

export const {} = careerSlice.actions;
export default careerSlice.reducer;
