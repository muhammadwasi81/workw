import { createAsyncThunk } from "@reduxjs/toolkit";
import { jsonToFormData } from "../../../../utils/base";
import { Mail_dto } from "../MailServices/dto";
import { MailServices } from "../MailServices/MailServices";

export const getMailFolders = createAsyncThunk(
  "mail/getMailFolders",
  async (_, { rejectWithValue }) => {
    alert();
    try {
      const response = await MailServices.getMenuFolders();
      console.log(response, "responseresponse");
      if (response.data.responseCode !== 1002)
        return rejectWithValue(response.data);
    } catch (e) {
      console.log(e, "responseresponse");
      return rejectWithValue(e.response.data);
    }
  }
);

export const getAllMail = createAsyncThunk(
  "mail/getAllMail",
  async (objData, { rejectWithValue }) => {
    try {
      const payload = Mail_dto.getAllMail(objData);
      const response = await MailServices.getAllEmail(payload);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const refreshMail = createAsyncThunk(
  "mail/refreshMail",
  async (objData, { rejectWithValue }) => {
    try {
      const response = await MailServices.getAllEmail(objData);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const getMailById = createAsyncThunk(
  "mail/getMailById",
  async (params, rejectWithValue) => {
    try {
      const response = await MailServices.getMailById(params);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const composeMail = createAsyncThunk(
  "mail/compose",
  async (data, rejectWithValue) => {
    try {
      const payload = jsonToFormData(data);
      const response = await MailServices.composeMail(payload);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const changeMailSeenFlag = createAsyncThunk(
  "mail/changeMailSeenFlag",
  async (params, rejectWithValue) => {
    try {
      const response = await MailServices.changeMailSeenFlag(params);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const moveEmailToTrash = createAsyncThunk(
  "mail/moveEmailToTrash",
  async (params, rejectWithValue) => {
    try {
      const response = await MailServices.moveEmailToTrash(params);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const deleteEmail = createAsyncThunk(
  "mail/deleteEmail",
  async (id, rejectWithValue) => {
    try {
      const response = await MailServices.deleteEmail(id);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);
