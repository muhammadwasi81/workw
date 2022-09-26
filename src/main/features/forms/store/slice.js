import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addForm } from "./actions";

const initialState = {
  forms: [],
  loadingData: false,
  createLoader: false,
  loader: false,
  success: false,
  error: false,
  formDetail: {},
  listLoading: false,
  currentTab: "allDocuments",
  isOpenComposers: {
    folder: false,
    upload: false,
    milegrid: false,
    milepad: false,
    mileboard: false,
    mileshow: false,
  },
};

const formSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    handleOpenDocComposer: (state, { payload: key }) => {
      state.isOpenComposers[key] = true;
    },
    handleCloseDocComposer: (state, { payload: key }) => {
      state.isOpenComposers[key] = false;
    },
    handleChangeTab: (state, { payload: tab }) => {
      state.currentTab = tab;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(addForm.fulfilled, (state, { payload }) => {
        // console.log("*****", payload.data);
        if (payload.data.data) {
          // console.log("before adding", state.departments);
          state.departments.unshift(payload.data.data);
          // console.log("after adding", state.departments);
        }
        state.success = true;
      })
      .addMatcher(isPending(...[addForm]), (state) => {
        // console.log("its pending");
        state.createLoader = true;
      });
  },
});

export const {
  handleOpenDocComposer,
  handleCloseDocComposer,
  handleChangeTab,
} = formSlice.actions;
export default formSlice.reducer;
