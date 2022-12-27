import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import {
  addProject,
  // addProjectFeatureAction,
  getAllProjects,
  getProjectById,
  updateProject,
} from './actions';

const initialState = {
  projects: [],
  loadingData: false,
  loader: true,
  success: false,
  error: false,
  projectDetail: null,
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    resetProjectDetail(state, { payload }) {
      state.projectDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.projects = action.payload ? action.payload.data : [];
        state.loader = false;
        state.success = true;
      })
      .addCase(addProject.fulfilled, (state, { payload }) => {
        // console.log("add project", payload);
        state.projects.unshift(payload.data);
        state.loader = false;
        state.success = true;
      })
      .addCase(getProjectById.fulfilled, (state, { payload }) => {
        state.projectDetail = payload.data;
        state.loader = false;
        state.success = true;
      })
      .addCase(updateProject.fulfilled, (state, { payload }) => {
        state.projectDetail = payload.data;
        state.loader = false;
        state.success = true;
      });
    // .addCase(addProjectFeatureAction.fulfilled, (state, { payload }) => {
    //   state.projects = [...state.projects, ...payload];
    //   state.loader = false;
    //   state.success = true;
    //   console.log('slice ka data', payload);
    // });

    builder
      .addMatcher(
        isPending(
          ...[
            getAllProjects,
            addProject,
            getProjectById,
            updateProject,
            // addProjectFeatureAction,
          ]
        ),
        (state) => {
          state.loader = true;
          state.error = false;
          state.success = false;
        }
      )
      .addMatcher(
        isRejected(
          ...[
            getAllProjects,
            addProject,
            getProjectById,
            updateProject,
            // addProjectFeatureAction,
          ]
        ),
        (state) => {
          state.loader = false;
          state.error = true;
          state.success = false;
        }
      );
  },
});

export const { resetProjectDetail } = projectSlice.actions;
export default projectSlice.reducer;
