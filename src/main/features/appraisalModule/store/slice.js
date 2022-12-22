import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  getAllTaskForAppraisalAction,
  getAllAppraisalAction,
  addAppraisal,
  getAllAppraisalByIdAction,
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
  detailLoader: false,
  currentTab: "allAppraisals",
  drawerOpen: false,
  loader: false,
  userTask: [],
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
      .addCase(addAppraisal.fulfilled, (state, { payload }) => {
        // state.appraisals = payload;
        console.log(payload);
        state.loader = false;
      })
      .addMatcher(isPending(...[getAllTaskForAppraisalAction]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[addAppraisal]), (state) => {
        console.log("pending add appraisal");
        state.loader = true;
      })
      .addMatcher(isPending(...[getAllAppraisalAction]), (state) => {
        state.loader = true;
      })
      .addMatcher(isPending(...[getAllAppraisalByIdAction]), (state) => {
        console.log("pending");
        state.detailLoader = true;
      })
      .addMatcher(isRejected(...[getAllTaskForAppraisalAction]), (state) => {
        state.loader = false;
      })
      .addMatcher(isRejected(...[addAppraisal]), (state) => {
        state.loader = false;
        console.log("rejected add appraisal task module");
      })
      .addMatcher(isRejected(...[getAllAppraisalAction]), (state) => {
        state.loader = false;
      })
      .addMatcher(isRejected(...[getAllAppraisalByIdAction]), (state) => {
        state.detailLoader = false;
      });
  },
});

export const {
  handleOpenComposer,
  addCareerList,
  handleChangeTab,
} = appraisalModuleSlice.actions;
export default appraisalModuleSlice.reducer;
