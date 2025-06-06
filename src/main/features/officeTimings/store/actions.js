import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import AxiosConfig from "../../../../utils/services/AxiosConfig";
import { gradeDeleted } from "../../grade/store/slice";
import {
  addOfficeTimingService,
  getAllOfficeTimingService,
  updateOfficeTimingService,
  getOfficeTimingbyIdService,
} from "../services/service";

const API_PREFIX = "konnectapi/api/OfficeTimingGroup/";

export const getAllOfficeTimingGroups = createAsyncThunk(
  "OfficeTiming/getAllOfficeTimingGroups",
  async (args, { dispatch, getState }) => {
    console.log(args, "argumentss");
    const res = await getAllOfficeTimingService(args);
    console.log(res, "office timingggg");
    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const addOfficeTimingGroup = createAsyncThunk(
  "OfficeTimingGroup/addOfficeTimingGroup",
  async (args, { dispatch }) => {
    console.log(args, "argssss");
    const res = await addOfficeTimingService(args);
    console.log(res, "response");
    if (res.responseCode && res.responseCode === responseCode.Success) {
      message.success("Office Timing Group added successfully!");
      responseMessage({ dispatch, data: res });
    } else {
      message.error(res.message);
    }
    return res;
  }
);

export const updateOfficeTimingGroupAction = createAsyncThunk(
  "OfficeTimingGroup/updateOfficeTimingGroup",
  async (args, { dispatch }) => {
    const res = await updateOfficeTimingService(args);
    if (res.responseCode && res.responseCode === responseCode.Success) {
      message.success("Office Timing Group updated successfully!");
      responseMessage({ dispatch, data: res });
    } else {
      message.error(res.message);
    }
    return res;
  }
);

export const getOfficeTimingByIdAction = createAsyncThunk(
  "OfficeTimingGroup/getOfficeTimingGroup",
  async (id, { dispatch }) => {
    const res = await getOfficeTimingbyIdService(id);
    if (res.responseCode && res.responseCode === responseCode.Success) {
      // message.success("Office Timing Get successfully!");
      responseMessage({ dispatch, data: res });
    } else {
      message.error(res.message);
    }
    return res;
  }
);
