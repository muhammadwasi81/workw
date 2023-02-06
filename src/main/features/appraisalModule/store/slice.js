import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  getAllTaskForAppraisalAction,
  getAllAppraisalAction,
  addAppraisal,
  getAllAppraisalByIdAction,
  getAllAppraisalByMeAction,
  getAllPreviousAppraisalAction,
} from "./action";

const defaultCareer = {
  id: 1,
  designation: "",
  description: "",
  department: "",
  minSalary: 0,
  maxSalary: 0,
  experience: "",
};
const initialState = {
  success: false,
  appraisals: [],
  appraisalDetail: {},
  previousAppraisals: [],
  detailLoader: false,
  currentTab: "allAppraisals",
  drawerOpen: false,
  loader: false,
  userTask: [],
  addSuccess: false,
};

const appraisalModuleSlice = createSlice({
  name: "appraisalModule",
  initialState,
  reducers: {
    handleOpenComposer: (state, { payload }) => {
      state.drawerOpen = payload;
    },
    addCareerList: (state) => {
      state.items = [
        ...state.items,
        {
          ...defaultCareer,
        },
      ];
    },
    handleChangeTab: (state, { payload: tab }) => {
      state.currentTab = tab;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTaskForAppraisalAction.fulfilled, (state, { payload }) => {
        state.userTask = payload;
        state.loader = false;
      })
      .addCase(getAllAppraisalAction.fulfilled, (state, { payload }) => {
        state.appraisals = payload;
        state.loader = false;
      })
      .addCase(getAllAppraisalByIdAction.fulfilled, (state, { payload }) => {
        state.appraisalDetail = payload;
        state.detailLoader = false;
      })
      .addCase(getAllAppraisalByMeAction.fulfilled, (state, { payload }) => {
        state.userTask = payload;
        state.loader = false;
      })
      .addCase(
        getAllPreviousAppraisalAction.fulfilled,
        (state, { payload }) => {
          state.previousAppraisals = payload;
          state.loader = false;
        }
      )
      .addCase(addAppraisal.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.addSuccess = true;
      })
      .addMatcher(isPending(...[getAllTaskForAppraisalAction]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[addAppraisal]), (state) => {
        state.loader = true;
        state.addSuccess = false;
      })
      .addMatcher(isPending(...[getAllAppraisalAction]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[getAllAppraisalByMeAction]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[getAllPreviousAppraisalAction]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[getAllAppraisalByIdAction]), (state) => {
        state.detailLoader = true;
      })
      .addMatcher(isRejected(...[getAllTaskForAppraisalAction]), (state) => {
        state.loader = false;
      })
      .addMatcher(isRejected(...[addAppraisal]), (state) => {
        state.loader = false;
        state.addSuccess = false;
      })
      .addMatcher(isRejected(...[getAllAppraisalAction]), (state) => {
        state.loader = false;
      })
      .addMatcher(isRejected(...[getAllAppraisalByIdAction]), (state) => {
        state.detailLoader = false;
      })
      .addMatcher(isRejected(...[getAllAppraisalByMeAction]), (state) => {
        state.loader = false;
      })
      .addMatcher(isRejected(...[getAllPreviousAppraisalAction]), (state) => {
        state.loader = false;
      });
  },
});

export const {
  handleOpenComposer,
  addCareerList,
  handleChangeTab,
} = appraisalModuleSlice.actions;
export default appraisalModuleSlice.reducer;
