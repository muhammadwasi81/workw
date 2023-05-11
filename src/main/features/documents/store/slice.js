import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { STRINGS } from "../../../../utils/base";
import { PostPrivacyType } from "../../../../utils/Shared/enums/enums";
import { getComposerKeyByType } from "../constant/helpers";
import {
  addDocument,
  getAllDocument,
  getAllDocumentList,
  moveDocument,
  GetDocumentById,
  addDirectory,
  addDocumentDirectoryList,
  getAllDocumentDirectoryList,
  AddDocumentMember,
} from "./actions";

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
    updateMembers: false,
  },
  composersInitState: {
    folder: {},
    upload: {},
    milegrid: {},
    milepad: {},
    mileboard: {},
    mileshow: {},
    updateFolderMemberId: null,
    members: [],
  },
  isTableView: false,
  listData: [],
  detailListData: [],
  documentDetail: [],
  editData: null,
  success: false,
  loader: false,
  listLoader: false,
  detailLoader: false,
  error: false,
  parentId: null,
  breadCumbPath: [
    {
      label: "Home",
      id: STRINGS.DEFAULTS.guid,
    },
  ],
  defaultFiles: [],
  minimzedDocuments: [],
  AddDocReaderAndCollabrator:[]
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
      state.composersInitState[key] = {};
    },
    handleChangeTab: (state, { payload: tab }) => {
      state.currentTab = tab;
    },
    handleChangeView: (state, { payload: isTableView }) => {
      state.isTableView = isTableView;
    },
    // addMember: (state, { payload }) => {
    //   state.addMemberModal = payload;
    // },
    handleParentId: (state, { payload }) => {
      state.parentId = payload.id;
      state.breadCumbPath = [
        ...state.breadCumbPath,
        {
          label: payload.name,
          id: payload.id,
        },
      ];
    },
    resetBreadCumb: (state, { payload }) => {
      state.breadCumbPath = [
        {
          label: "Home",
          id: STRINGS.DEFAULTS.guid,
        },
      ];
      state.parentId = STRINGS.DEFAULTS.guid;
    },
    handleBreadCumb: (state, { payload }) => {
      state.breadCumbPath = state.breadCumbPath.slice(0, payload.index + 1);
      state.parentId = payload.id;
    },
    updateMoveDocument: (state, { payload }) => {
      state.listData = state.listData.filter(
        (item) => item.id !== payload.documents[0]
      );
    },
    uploadFileByDrop: (state, { payload }) => {
      state.defaultFiles = payload;
    },
    handleUpdateFolder: (state, { payload }) => {
      state.isOpenComposers.folder = true;
      state.composersInitState.folder = payload;
    },
    handleUpdateFolderMemberId: (state, { payload }) => {
      state.composersInitState.updateFolderMemberId = payload.id;
    },
    handleAddMinimizeDocument: (state, { payload }) => {
      let dcoumentItem = {
        isOpen: false,
        id: payload.id,
        document: {
          ...payload,
        },
      };
      let isAlreadyAvailable = state.minimzedDocuments.find((document)=> document.id === payload.id)
      if(!(!!isAlreadyAvailable)){
        state.minimzedDocuments = [...state.minimzedDocuments, dcoumentItem];
      }
    },
    handleRemoveMinimizeDocument: (state, { payload }) => {
      let id = payload.id;
      state.minimzedDocuments = state.minimzedDocuments.filter(
        (item) => item.id !== id
      );
    },
    toggleMinimizeDocument: (state, { payload: { id, status } }) => {
      let index = state.minimzedDocuments.findIndex((item) => item.id === id);
      state.minimzedDocuments[index] = {
        ...state.minimzedDocuments[index],
        isOpen: status,
      };
    },
    handleFavoriteMark(state, { payload }) {
      const favDocs = state.listData.find((group) => group.id === payload.id);
      favDocs.isPinnedPost = !favDocs.isPinnedPost;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addDocument.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.success = true;
        state.listData = [
          ...payload.map((item) => ({
            ...item,
            path: item.attachments[0].path,
            name: item.attachments[0].name,
          })),
          ...state.listData,
        ];
        state.defaultFiles = [];
        state.isOpenComposers.mileboard = false;
        state.isOpenComposers.milegrid = false;
        state.isOpenComposers.milepad = false;
        state.isOpenComposers.mileshow = false;
        state.isOpenComposers.upload = false;
        // handle minimize document working...
        let createdDocument = state.listData[0];
        let dcoumentItem = {
          isOpen: true,
          id: createdDocument.id,
          document: {
            ...createdDocument,
          },
        };
        state.minimzedDocuments = [...state.minimzedDocuments, dcoumentItem];
      })
      .addCase(addDirectory.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.success = true;
        state.listData = [payload, ...state.listData];
        state.isOpenComposers.folder = false;
      })
      // .addCase(moveDocument.fulfilled, (state, { payload }) => {
      //   state.listData = state.listData.filter(item=>item.id !== payload.documents[0]);
      // })
      .addCase(getAllDocumentList.fulfilled, (state, { payload }) => {
        state.listLoader = false;
        state.listData = payload;
      })
      .addCase(getAllDocument.fulfilled, (state, { payload }) => {
        state.listLoader = false;
        state.detailListData = payload;
      })
      .addCase(GetDocumentById.fulfilled, (state, action) => {
        state.documentDetail = action.payload;
        state.detailLoader = false;
      })
      .addCase(getAllDocumentDirectoryList.fulfilled, (state, { payload }) => {
        state.composersInitState.members = payload;
      })
      .addCase(addDocumentDirectoryList.fulfilled, (state, { payload }) => {
        // state.composersInitState.members = [...state.composersInitState.members, payload];
        // state.loader = true;
      })
      .addCase(AddDocumentMember.fulfilled, (state, { payload }) => {
          state.AddDocReaderAndCollabrator = payload
        // state.composersInitState.members = [...state.composersInitState.members, payload];
        // state.loader = true;
      })
      .addCase(addDocument.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(addDirectory.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(GetDocumentById.pending, (state, action) => {
        state.detailLoader = true;
      })
      .addMatcher(
        isPending(...[getAllDocument, getAllDocumentList]),
        (state) => {
          state.listLoader = true;
          state.success = false;
          state.error = false;
        }
      )
      .addMatcher(
        isRejected(...[addDocument, getAllDocument, getAllDocumentList]),
        (state) => {
          state.listLoader = false;
          state.loader = false;
        }
      );
  },
});

export const {
  handleOpenDocComposer,
  handleCloseDocComposer,
  handleChangeTab,
  handleParentId,
  resetBreadCumb,
  handleBreadCumb,
  updateMoveDocument,
  uploadFileByDrop,
  handleChangeView,
  handleUpdateFolder,
  handleUpdateFolderMemberId,
  handleAddMinimizeDocument,
  handleRemoveMinimizeDocument,
  toggleMinimizeDocument,
  handleFavoriteMark,
} = documentSlice.actions;
export default documentSlice.reducer;
