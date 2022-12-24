import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import {
  getBasicInfo,
  updateProfileService,
  updateEmployeeEmailService,
  updateEmployeePhoneNoService,
  updateStatusService,
  updatePasswordService,
} from "../services/service";

const personal_email = (data) => {
  return {};
};
export const getBasicInfoAction = createAsyncThunk(
  `settings/basicInfo`,
  async (id) => {
    const response = await getBasicInfo(id);
    return response.data;
  }
);

export const updateProfileAction = createAsyncThunk(
  `settings/updateProfile`,
  async (args, { dispatch }) => {
    const res = await updateProfileService(args);
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        res.message = "Profile updated successfully!";
      message.success(res.message);
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

export const updateEmployeeEmailAction = createAsyncThunk(
  `settings/updateEmployeeEmail`,
  async (args, { dispatch }) => {
    const res = await updateEmployeeEmailService(args);
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        res.message = "Email updated successfully!";
      message.success(res.message);
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

export const updateEmployeePhoneAction = createAsyncThunk(
  `settings/updateEmployeePhone`,
  async (args, { dispatch }) => {
    const res = await updateEmployeePhoneNoService(args);
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        res.message = "Phone No updated successfully!";
      message.success(res.message);
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

export const updateEmployeeStatusAction = createAsyncThunk(
  `settings/updateEmployeeStatus`,
  async (args, { dispatch }) => {
    const res = await updateStatusService(args);
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        res.message = "Status updated successfully!";
      message.success(res.message);
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

export const updatePasswordAction = createAsyncThunk(
  `settings/updateEmployeePassword`,
  async (args, { dispatch }) => {
    const res = await updatePasswordService(args);
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        res.message = "Password updated successfully!";
      message.success(res.message);
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
