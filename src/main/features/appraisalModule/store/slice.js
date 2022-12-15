import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  getAllTaskForAppraisalAction,
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
  items: [],
  currentTab: "teamAppraisals",
  drawerOpen: false,
  careerDetail: {},
  careerApplicants: [],
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
      console.log(payload);
    })
    .addMatcher(isPending(...[getAllTaskForAppraisalAction]), (state) => {
      console.log('pending')
      state.loader = true;
    })
    .addMatcher(isRejected(...[getAllTaskForAppraisalAction]), (state) => {
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
