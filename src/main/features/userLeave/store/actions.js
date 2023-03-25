import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import { message } from "antd";
import {
  getUserBasicInfoByIdService,
  getUserLeaveByIdService,
  addUserLeaveByIdService,
  updateUserLeaveService,
} from "../service/service";
import { json } from "react-router-dom";

export const getUserBasicInfo = createAsyncThunk(
  "basicInfo",
  async (id, { dispatch, getState, rejectWithValue }) => {
    const res = await getUserBasicInfoByIdService(id);
    if (res.responseCode === responseCode.Success) {
      return res;
    } else {
      responseMessage({
        dispatch: dispatch,
        data: res,
        type: responseMessageType.ApiFailure,
      });
      return rejectWithValue(res.message);
    }
  }
);

export const getUserLeave = createAsyncThunk(
  "getUserLeaveInfo",
  async (id, { dispatch, getState, rejectWithValue }) => {
    console.log(id, "idddddddddddd in action");
    const res = await getUserLeaveByIdService(id);
    if (res.responseCode === responseCode.Success) {
      return res;
    } else {
      responseMessage({
        dispatch: dispatch,
        data: res,
        type: responseMessageType.ApiFailure,
      });
      return rejectWithValue(res.message);
    }
  }
);
export const addLeaveByEmployee = createAsyncThunk(
  "api/addLeaveByEmployee",
  async (args, { dispatch }) => {
    const res = await addUserLeaveByIdService(args);
    if (res.responseCode && res.responseCode === responseCode.Success) {
      message.success("Employee rebate added successfully!");
      responseMessage({ dispatch, data: res });
    } else {
      message.error(res.message);
    }
    return res;
  }
);
export const updateUserLeave = createAsyncThunk(
  "api/updateUserLeaveService",

  async (args, { dispatch }) => {
    console.log(args, "arddd");
    // const jsons = JSON.stringify(args);
    const res = await updateUserLeaveService(args);

    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        message.success("leaves updated successfully!");
      responseMessage({ dispatch, data: res });
    } else {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }

    return res;
  }
);
