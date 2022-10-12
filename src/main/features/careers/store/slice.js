import { createSlice } from "@reduxjs/toolkit";
import { addCareer, getAllCareerAction, getCareerByIdAction } from "./action";

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
      .addCase(getAllCareerAction.fulfilled, (state, { payload }) => {
        state.items = payload;
      })
      .addCase(getCareerByIdAction.fulfilled, (state, { payload }) => {
        console.log(payload, "payload STATE ITEMS");
        state.careerDetail = payload;

        console.log(state.careerDetail, "STATE ITEMS");
      });
  },
});

export const {
  handleOpenComposer,
  addCareerList,
  handleChangeTab,
} = careerSlice.actions;
export default careerSlice.reducer;
