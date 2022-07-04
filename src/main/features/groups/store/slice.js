import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { getAllProjects } from "./actions";

const initialState = {
  projects: [],
  loadingData: false,
  loader: true,
  projectDetail: null,
};

const projectSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProjects.fulfilled, (state, action) => {
      state.projects = action.payload ? action.payload : [];
      state.loader = false;
    });

    builder
      .addMatcher(isPending(...[getAllProjects]), (state) => {
        state.loader = true;
      })
      .addMatcher(isRejected(...[getAllProjects]), (state) => {
        state.loader = true;
      });
  },
});

export const {} = projectSlice.actions;
export default projectSlice.reducer;
