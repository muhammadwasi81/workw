import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addForm, getAllForms } from "./actions";

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
      .addCase(getAllForms.fulfilled, (state, { payload }) => {
        // console.log(payload);
        state.forms = payload ? payload : [];
        state.loader = false;
      })

      .addCase(addForm.fulfilled, (state, { payload }) => {
        console.log("*****payload data*********", payload.data);
        if (payload.data.data) {
          // console.log("before adding", state.departments);
          state.forms.unshift(payload.data.data);
          // console.log("after adding", state.departments);
        }
        state.success = true;
        state.createLoader = false;
      })
      .addMatcher(isPending(...[getAllForms]), (state) => {
        // console.log("its pending");
        state.loader = true;
      })
      .addMatcher(isPending(...[addForm]), (state) => {
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
