import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { addDocument } from "./actions";

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
  },
  listData: [],
  editData: null,
  success: false,
  loader: false,
  error: false
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

  extraReducers: (builder) => {
    builder
      .addCase(addDocument.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.success = true;
        state.listData = [payload, ...state.listData];
      })
      .addMatcher(
        isPending(
          ...[
            addDocument
          ]
        ),
        state => {
          state.loader = true;
          state.success = false;
          state.error = false;
        }
      );
  }

});

export const { handleOpenDocComposer, handleCloseDocComposer, handleChangeTab } = documentSlice.actions;
export default documentSlice.reducer;
