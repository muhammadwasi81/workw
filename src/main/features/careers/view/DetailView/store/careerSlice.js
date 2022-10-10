import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { responseCode } from "../../../../../../services/enums/responseCode.js";
import { getAllCareerAction } from "./action.js";

const defaultCareer = {
  id: 1,
  designation: "React",
  description: "Sanjna",
  department: "Miltap",
};
export const careerSlice = createSlice({
  name: "Careers",
  initialState: {
    careerList: [],
  },
  reducers: {
    addCareer: (state) => {
      state.careerList = [
        ...state.careerList,
        {
          ...defaultCareer,
        },
      ];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllCareerAction.fulfilled, (state, { payload }) => {
      // state.careerList = payload.data;
    });
  },
});

export const { addCareer } = careerSlice.actions;
export default careerSlice.reducer;
