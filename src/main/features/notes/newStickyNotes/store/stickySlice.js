import { createSlice, isPending, isRejected, current } from '@reduxjs/toolkit';
import { createGuid, STRINGS } from '../../../../../utils/base';
import {
  addSticky,
  deleteStickyAction,
  getAllStickyNotesAction,
  getColorCodeAction,
  getStickyNoteTitleAction,
  getStickyNoteDescAction,
  getStickyAttachmentAction,
} from './actions';

const defaultSticky = {
  id: 1,
  title: '',
  description: '',
  privacyId: '',
  isOpen: false,
  colorCode: '',
  attachments: [],
  // search:"",
};

export const stickySlice = createSlice({
  name: 'StickNoteSlice',
  initialState: {
    open: false,
    listArray: [],
    colorPicker: true,
    bgColor: '',
    openSticky: '',
  },
  reducers: {
    closeSticky: (state) => {
      state.open = false;
    },
    closeStickyNote: (state, action) => {
      let selectedId = action.payload;
      let currentIndex = state.listArray.findIndex(
        (it) => it.id === selectedId
      );
      state.listArray[currentIndex].isOpen = false;
    },

    addStickyNote: (state) => {
      state.listArray = [
        ...state.listArray,
        {
          ...defaultSticky,
        },
      ];
    },
    toggleStickyNote: (state) => {
      state.open = !state.open;
    },
    handleOpenSticky: (state, action) => {
      let openStickyId = action.payload;
      state.openSticky = openStickyId;
    },
    showStickyNote: (state, action) => {
      let selectedId = action.payload;
      let currentIndex = state.listArray.findIndex(
        (it) => it.id === selectedId
      );
      state.listArray[currentIndex].isOpen = true;
      state.openSticky = selectedId;
    },
    handleChangeNote: (state, action) => {
      let updatedNote = action.payload;
      let currentIndex = state.listArray.findIndex(
        (it) => it.id === updatedNote.id
      );
      state.listArray[currentIndex] = updatedNote;
    },
    deleteStickyNote: (state, action) => {
      const id = action.payload.id;
      state.listArray = state.listArray.filter((list) => list.id !== id);
    },
    addImage: (state, action) => {
      const values = action.payload;
      // const id=createGuid();
      const sticky = state.listArray.find((item) => item.id === values.id);
      sticky.attachments.push(values.images);
    },

    // ********color picker********

    selectStickyNoteColor: (state, action) => {
      const color = action.payload;
      const stickyObject = state.listArray.find(
        (stickyNotes) => stickyNotes.id === color.id
      );
      stickyObject.colorCode = color.colorValue;

      // const listObject = state.listArray.find((list) => list.id === color.id);
      // listObject.bgColor = color.colorValue;
    },

    targetTitleVal: (state, action) => {
      const val = action.payload;

      const listObj = state.listArray.find((list) => list.id === val.id);
      listObj.title = val.value;
    },
    targetStickyDescription: (state, action) => {
      const val = action.payload;
      console.log(val, 'valueee');
      const listObj = state.listArray.find((list) => list.id === val.id);
      listObj.description = val.value;
      console.log(listObj.description, 'description');
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addSticky.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.success = true;
        state.listArray = [{ ...payload, isOpen: true }, ...state.listArray];
        state.openSticky = payload.id;
      })
      .addCase(deleteStickyAction.fulfilled, (state) => {
        state.loader = false;
        state.success = true;
      })
      .addCase(getAllStickyNotesAction.fulfilled, (state, action) => {
        state.listArray = action.payload;
      })
      .addCase(getStickyNoteDescAction.fulfilled, (state, action) => {
        // state.listArray = action.payload;
      })
      .addCase(getStickyAttachmentAction.fulfilled, (state, action) => {
        let data = action.payload;

        state.loader = false;
        state.success = true;
        let currentIndex = state.listArray.findIndex((it) => it.id === data.id);

        state.listArray[currentIndex] = {
          ...data,

          attachments: [
            ...state.listArray[currentIndex].attachments,
            ...data.attachments,
          ],
          isOpen: true,
        };
      });
  },
});

export const {
  closeSticky,
  addStickyNote,
  toggleStickyNote,
  showStickyNote,
  handleChangeNote,
  closeStickyNote,
  deleteStickyNote,
  selectStickyNoteColor,
  targetTitleVal,
  targetStickyDescription,
  addImage,
  handleOpenSticky,
} = stickySlice.actions;
export default stickySlice.reducer;
