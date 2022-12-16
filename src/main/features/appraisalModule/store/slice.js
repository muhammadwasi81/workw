import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  getAllTaskForAppraisalAction,
  getAllAppraisalAction,
  addAppraisal
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
  currentTab: "teamAppraisals",
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
    .addCase(addAppraisal.fulfilled, (state, { payload }) => {
      // state.appraisals = payload;
      console.log(payload)
      state.loader = false;     
    })
    .addMatcher(isPending(...[getAllTaskForAppraisalAction]), (state) => {
      console.log('pending')
      state.loader = true;
    })
    .addMatcher(isPending(...[addAppraisal]), (state) => {
      console.log('pending add appraisal')
      state.loader = true;
    })
    .addMatcher(isPending(...[getAllAppraisalAction]), (state) => {
      console.log('get all appraisal pending')
      state.loader = true;
    })
    .addMatcher(isRejected(...[getAllTaskForAppraisalAction]), (state) => {
      state.loader = false;
      console.log("rejected get all appraisal task module");
    })
    .addMatcher(isRejected(...[addAppraisal]), (state) => {
      state.loader = false;
      console.log("rejected add appraisal task module");
    })
    .addMatcher(isRejected(...[getAllAppraisalAction]), (state) => {
      state.loader = false;
      console.log("rejected get all appraisal module");
    })
  },
});

export const {
  handleOpenComposer,
  addCareerList,
  handleChangeTab,
} = appraisalModuleSlice.actions;
export default appraisalModuleSlice.reducer;
