import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { STRINGS } from "../../../../utils/base";
import { getComposerKeyByType } from "../constant/helpers";
import { addDocument, getAllDocument, getAllDocumentList, moveDocument, GetDocumentById } from "./actions";

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
  documentDetail: [],
  editData: null,
  success: false,
  loader: false,
  error: false,
  parentId: null,
  breadCumbPath: [{
    label: "Home",
    id: STRINGS.DEFAULTS.guid
  }],
  defaultFiles:[]
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
    },
    resetBreadCumb: (state, { payload }) => {
      state.breadCumbPath =  [{
        label: "Home",
        id: STRINGS.DEFAULTS.guid
      }];
      state.parentId = STRINGS.DEFAULTS.guid;
    },
    handleBreadCumb: (state, { payload }) => {
      state.breadCumbPath = state.breadCumbPath.slice(0, (payload.index+1))
      state.parentId = payload.id;
    },
    updateMoveDocument: (state, { payload }) => {
      state.listData = state.listData.filter(item=>item.id !== payload.documents[0]);
    },
    uploadFileByDrop: (state, { payload }) => {
      state.defaultFiles = payload;
    },
    
  },

  extraReducers: (builder) => {
    builder
      .addCase(addDocument.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.success = true;
        state.listData = payload.attachments.length > 0 ? 
        [
          ...payload.attachments.map((item)=>({
          ...payload,
          path: item.path,
          name:item.attachmentName
        })),
        ...state.listData
      ] : [payload, ...state.listData]
        //  [payload, ...state.listData];
        state.defaultFiles = [];
        state.isOpenComposers.folder = false;
        state.isOpenComposers.mileboard = false;
        state.isOpenComposers.milegrid = false;
        state.isOpenComposers.milepad = false;
        state.isOpenComposers.mileshow = false;
        state.isOpenComposers.upload = false;
      })
      // .addCase(moveDocument.fulfilled, (state, { payload }) => {
      //   state.listData = state.listData.filter(item=>item.id !== payload.documents[0]);
      // })
      .addCase(getAllDocumentList.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.success = true;
        state.listData = payload;
      })
      .addCase(getAllDocument.fulfilled, (state, {payload}) => {
        state.loader = false;
        state.success = true;
        state.detailListData = payload;
      })
      .addCase(GetDocumentById.fulfilled, (state, action) => {
        state.documentDetail = action.payload;
      })
      .addMatcher(
        isPending(
          ...[
            addDocument,
            getAllDocument,
            getAllDocumentList
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

export const { handleOpenDocComposer, handleCloseDocComposer, handleChangeTab, handleParentId,
  resetBreadCumb, handleBreadCumb, updateMoveDocument, uploadFileByDrop } = documentSlice.actions;
export default documentSlice.reducer;
