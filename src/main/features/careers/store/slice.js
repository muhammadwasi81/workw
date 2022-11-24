import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
  addCareer,
  getAllCareerAction,
  getCareerByIdAction,
  addCareerApplicant,
  getAllCareerApplicant,
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
  applySuccess: false,
  applyComposer: false,
  success: false,
  items: [],
  currentTab: "careers",
  drawerOpen: false,
  careerDetail: {},
  careerApplicants: [],
  loader: false,
  careerLoader: false,
  careerByIdLoader: false,
  createLoader: false,
};

const careerSlice = createSlice({
  name: "careers",
  initialState,
  reducers: {
    handleOpenComposer: (state, { payload }) => {
      state.drawerOpen = payload;
    },
    handleOpenApplyComposer: (state, { payload }) => {
      state.applyComposer = payload;
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
      .addCase(addCareer.fulfilled, (state, { payload }) => {
        // console.log(payload);
        state.drawerOpen = false;
        state.success = true;
        state.createLoader = false;
        // state.items = [...state.items, payload];
        state.items.unshift(payload);
      })
      .addCase(addCareerApplicant.fulfilled, (state, { payload }) => {
        // console.log(payload);
        state.applySuccess = true;
        state.applyComposer = false;
        state.careerLoader = false;
      })
      .addCase(getAllCareerApplicant.fulfilled, (state, { payload }) => {
        state.careerApplicants = payload;
        // console.log(payload);
      })
      .addCase(getAllCareerAction.fulfilled, (state, { payload }) => {
        // console.log(payload);
        state.items = payload;
        state.loader = false;
      })
      .addCase(getCareerByIdAction.fulfilled, (state, { payload }) => {
        // console.log(payload, "payload STATE ITEMS");
        state.careerDetail = payload;
        state.loader = false;
        state.careerByIdLoader = false;
        // console.log(state.careerDetail, "STATE ITEMS");
      })
      .addMatcher(isPending(...[addCareer]), (state) => {
        // console.log("pending add career applied");
        state.createLoader = true;
        state.success = false;
      })
      .addMatcher(isPending(...[getCareerByIdAction]), (state) => {
        // state.loader = true;
        state.careerByIdLoader = true;
      })
      .addMatcher(isPending(...[addCareerApplicant]), (state) => {
        state.applySuccess = false;
        state.careerLoader = true;
        console.log("pending applied");
      })
      .addMatcher(isPending(...[getAllCareerAction]), (state) => {
        state.loader = true;
      })
      .addMatcher(isRejected(...[getCareerByIdAction]), (state) => {
        // state.loader = false;
        state.careerByIdLoader = true;
      })
      .addMatcher(isRejected(...[addCareer]), (state) => {
        state.createLoader = false;
      })
      .addMatcher(isRejected(...[getAllCareerAction]), (state) => {
        state.loader = false;
        console.log("rejected get all career");
      })
      .addMatcher(isRejected(...[addCareerApplicant]), (state) => {
        state.careerLoader = false;
        console.log("rejected add career applicant");
      });
  },
});

export const {
  handleOpenComposer,
  addCareerList,
  handleChangeTab,
  handleOpenApplyComposer,
} = careerSlice.actions;
export default careerSlice.reducer;
