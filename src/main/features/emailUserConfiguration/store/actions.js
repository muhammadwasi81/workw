import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import AxiosConfig from "../../../../utils/services/AxiosConfig";
import { message } from "antd";
import {
  addUserEmailConfigurationService,
  getAllUserEmailConfigurationsService,
  getAllBussinessEmailConfigurationService,
  updateUserEmailConfigurationService,
} from "../services/service";
// import { emailConfigurationDeleted } from "./slice";

const API_PREFIX = "konnectmailbox/api/EmailConfiguration/";

export const getAllUserEmailConfigurations = createAsyncThunk(
  "UserEmailConfiguration/getUserEmailconfigurationbyId",
  async (args, { dispatch, getState }) => {
    const res = await getAllUserEmailConfigurationsService(args);

    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const getAllBussinessEmailConfiguration = createAsyncThunk(
  "UserEmailConfiguration/getUserEmailconfiguration",
  async (args, { dispatch, getState }) => {
    const res = await getAllBussinessEmailConfigurationService();

    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const addUserEmailConfiguration = createAsyncThunk(
  "UserEmailConfiguration/addUserEmailConfiguration",
  async (args, { dispatch, getState }) => {
    const res = await addUserEmailConfigurationService(args);
    console.log(res, "response");
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        message.success("Email configuration added successfully!");
    } else {
      message.error(res.message);
    }

    return res;
  }
);

export const updateUserEmailConfiguration = createAsyncThunk(
  "UserEmailConfiguration/updateUserEmailConfiguration",
  async (args, { dispatch, getState }) => {
    const res = await updateUserEmailConfigurationService(args);
    console.log(res, "response");
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        message.success("Email configuration updated successfully!");
    } else {
      message.error(res.message);
    }

    return res;
  }
);
