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
  updateUserLeaveService,
} from "../service/service";

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

export const updateUserLeave = createAsyncThunk(
  "api/updateUserLeaveService",

  async (args, { dispatch }) => {
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
