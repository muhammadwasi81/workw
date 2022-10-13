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
  success: false,
  items: [],
  currentTab: "careers",
  drawerOpen: false,
  careerDetail: {},
  careerApplicants: [],
};

const careerSlice = createSlice({
  name: "careers",
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
      .addCase(addCareer.fulfilled, (state, { payload }) => {
        state.drawerOpen = false;
        state.success = true;
        state.items = [...state.items, payload.data.data];
      })
      .addCase(addCareerApplicant.fulfilled, (state, { payload }) => {
        console.log(payload);
        // if (payload.data.data) {
        //   state.loanList.unshift(payload.data.data);
        //   state.isCreateComposer = true;
        // }
      })
      .addCase(getAllCareerApplicant.fulfilled, (state, { payload }) => {
        // state.careerApplicants = payload;
        console.log(payload);
      })
      .addCase(getAllCareerAction.fulfilled, (state, { payload }) => {
        state.items = payload;
      })
      .addCase(getCareerByIdAction.fulfilled, (state, { payload }) => {
        console.log(payload, "payload STATE ITEMS");
        state.careerDetail = payload;

        console.log(state.careerDetail, "STATE ITEMS");
      })
      .addMatcher(isPending(...[addCareerApplicant]), (state) => {
        console.log("pending applied");
      });
  },
});

export const {
  handleOpenComposer,
  addCareerList,
  handleChangeTab,
} = careerSlice.actions;
export default careerSlice.reducer;
