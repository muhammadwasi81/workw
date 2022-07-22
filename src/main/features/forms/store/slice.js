import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";

const initialState = {
  listLoading: false,
  currentTab: "allDocuments",
  isOpenComposers: {
    folder: false,
    upload: false,
    milegrid: false,
    milepad: false,
    mileboard: false,
    mileshow: false,
  }
};

const documentSlice = createSlice({
  name: "document",
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
    }
  },

});

export const { handleOpenDocComposer, handleCloseDocComposer, handleChangeTab } = documentSlice.actions;
export default documentSlice.reducer;
