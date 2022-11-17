import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  addFormService,
  submitFormService,
  getAllFormsService,
  GetFormByIdService,
  updateFormService,
} from "../services/service";

export const getAllForms = createAsyncThunk(
  "Form/getAllForms",
  async (data) => {
    const response = await getAllFormsService(data);

    if (!response.responseCode) {
      message.error("Something went wrong");
    }
    // console.log("response data from actions", response.data);
    return response.data;
  }
);

export const addForm = createAsyncThunk(
  "Form/CreateForm",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await addFormService(data);
    if (res.data?.responseCode === responseCode.Success) {
      message.success("Form Created");
      console.log("res from actions", res);
      return res;
    } else {
      message.error(res.statusText);
      return rejectWithValue(res.statusText);
    }
  }
);

export const submitForm = createAsyncThunk(
  "Form/SubmitForm",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await submitFormService(data);
    if (res.data?.responseCode === responseCode.Success) {
      message.success("Form Submitted");
      console.log("res from actions", res);
      return res;
    } else {
      message.error(res.statusText);
      return rejectWithValue(res.statusText);
    }
  }
);

export const updateForm = createAsyncThunk(
  "Form/updateForm",
  async (data, { dispatch, getState, rejectWithValue }) => {
    // console.log(data, "data in update async");
    const res = await updateFormService(data);

    if (res.data.responseCode) {
      if (res.data.responseCode === responseCode.Success)
        message.success("Form updated successfully!");
    } else {
      message.error(res.statusText);
      return rejectWithValue(res.statusText);
    }

    return res;
  }
);

export const getFormById = createAsyncThunk(
  "Form/getFormById",
  async (data) => {
    const response = await GetFormByIdService(data);

    // if (!response.responseCode) {
    //   message.error("Something went wrong");
    // }
    // console.log("response data from actions", response.data);
    return response.data;
  }
);
