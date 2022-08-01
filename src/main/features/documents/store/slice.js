import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { STRINGS } from "../../../../utils/base";
import { addDocument, getAllDocument, getAllDocumentList } from "./actions";

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
  detailListData: [],
  editData: null,
  success: false,
  loader: false,
  error: false,
  parentId: null,
  breadCumbPath: [{
    label: "Home",
    id: STRINGS.DEFAULTS.guid
  }],
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
    },
    handleParentId: (state, { payload }) => {
      state.parentId = payload.id;
      state.breadCumbPath = [...state.breadCumbPath, {
        label: payload.name,
        id: payload.id
      }];
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(addDocument.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.success = true;
        state.listData = [payload, ...state.listData];
      })
      .addCase(getAllDocumentList.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.success = true;
        state.listData = payload
      })
      .addCase(getAllDocument.fulfilled, (state, {payload}) => {
        state.loader = false;
        state.success = true,
        state.detailListData = payload;
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

export const { handleOpenDocComposer, handleCloseDocComposer, handleChangeTab, handleParentId } = documentSlice.actions;
export default documentSlice.reducer;
