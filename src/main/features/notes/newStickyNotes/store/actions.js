import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseType } from "../../../../../utils/api/ResponseResult";
import { jsonToFormData, STRINGS } from "../../../../../utils/base";
import { openNotification } from "../../../../../utils/Shared/store/slice";
import {
  addStickyNotesService,
  deleteStickyNoteService,
  getAllStickyNotesService,
  addStickyNote,
} from "../services/service";
import {
  deleteStickyNote,
  selectStickyNoteColor,
  targetTitleVal,
  targetStickyDescription,
} from "./stickySlice";

const addSticky_SD = (data) => {
  return {
    id: data.id ? data.id : 1,
    title: data.title ? data.title : "",
    description: data.description ? data.description : "",
    privacyId: data.privacyId ? data.privacyId : 1,
    colorCode: data.colorCode ? data.colorCode : "",
    attachments: data.attachments ? data.attachments : [],
  };
};

export const addSticky = createAsyncThunk(
  "stickySlice/addSticky",
  async (payload, { rejectWithValue, dispatch }) => {
    let request = addSticky_SD(payload);

    const response = await addStickyNotesService(request);
    console.log(response);
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        dispatch(
          openNotification({
            type: "success",
            duration: 2,
          })
        );
        return response.data;
      default:
        return;
    }
  }
);
export const getColorCodeAction = createAsyncThunk(
  "stickySlice/getColorCodeAction",
  async (payload, { rejectWithValue, dispatch }) => {
    let request = addSticky_SD(payload);
    const formdataRequest = jsonToFormData(request);

    const response = await addStickyNotesService(formdataRequest);
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        return response.data;
      default:
        return;
    }
  }
);

export const getStickyNoteTitleAction = createAsyncThunk(
  "stickySlice/getStickyNoteTitleAction",
  async (payload, { rejectWithValue, dispatch }) => {
    let request = addSticky_SD(payload);
    const formdataRequest = jsonToFormData(request);

    const response = await addStickyNotesService(formdataRequest);
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        return response.data;
      default:
        return;
    }
  }
);

export const getStickyNoteDescAction = createAsyncThunk(
  "stickySlice/getStickyNoteDescAction",
  async (payload, { rejectWithValue, dispatch }) => {
    let request = addSticky_SD(payload);
    const formdataRequest = jsonToFormData(request);

    const response = await addStickyNotesService(formdataRequest);
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        return response.data;
      default:
        return;
    }
  }
);
export const getStickyAttachmentAction = createAsyncThunk(
  "stickySlice/getStickyAttachmentAction",
  async (payload, { rejectWithValue, dispatch }) => {
    let request = addSticky_SD(payload);
    const formdataRequest = jsonToFormData(request);

    const response = await addStickyNotesService(formdataRequest);
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        return response.data;
      default:
        return;
    }
  }
);

export const getAllStickyNotesAction = createAsyncThunk(
  "stickySlice/getAllStickyNotesAction",
  async (request, { rejectWithValue }) => {
    const response = await getAllStickyNotesService(request);
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        return response.data;
      default:
        return;
    }
  }
);

export const deleteStickyAction = createAsyncThunk(
  "stickySlice/deleteStickyAction",
  async (request, { rejectWithValue, dispatch }) => {
    const response = await deleteStickyNoteService(request);
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        dispatch(deleteStickyNote({ id: request }));
        return response.data;
      default:
        return;
    }
  }
);
