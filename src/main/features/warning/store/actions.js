import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import {
  addWarningService,
  cancelWarningService,
  getAllWarningService,
  GetWarningByIdService,
} from "../services/service";
import { cancelWarningSuccess } from "./slice";

export const getAllWarnings = createAsyncThunk(
  "Warning/GetAllWarning",
  async (data) => {
    const response = await getAllWarningService(data);
    console.log(response, "ALL Warnings");
    if (!response.responseCode) {
      message.error("Something went wrong");
    }
    return response.data;
  }
);

export const addWarning = createAsyncThunk(
  "Warning/addWarning",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await addWarningService(data);
    if (res.data?.responseCode === responseCode.Success) {
      message.success("Warning Created");
      return res;
    } else {
      message.error(res.data.message);
      return rejectWithValue(res.data.message);
    }
  }
);

export const GetWarningById = createAsyncThunk(
  "Warning/GetWarningById",
  async (id) => {
    const response = await GetWarningByIdService(id);
    console.log("MY ID", id);
    return response.data;
  }
);

export const cancelWarning = createAsyncThunk(
  "Warning/cancelWarning",
  async (id, { dispatch, setState }) => {
    const response = await cancelWarningService(id);
    dispatch(cancelWarningSuccess({ warningId: id }));
    return response;
  }
);
