import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import AxiosConfig from "../../../../utils/services/AxiosConfig";
import {
  addEmailConfigurationService,
  getAllEmailConfigurationsService,
} from "../services/service";
import { emailConfigurationDeleted } from "./slice";

const API_PREFIX = "konnectmailbox/api/EmailConfiguration/";

export const getAllEmailConfigurations = createAsyncThunk(
  "EmailConfiguration/getemailconfigurationbybusinessid",
  async (args, { dispatch, getState }) => {
    const res = await getAllEmailConfigurationsService();

    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const addEmailConfiguration = createAsyncThunk(
  "EmailConfiguration/addEmailConfiguration",
  async (args, { dispatch, getState }) => {
    const res = await addEmailConfigurationService(args);
    console.log(res, "response");
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        res.message = "Email Configuration added successfully!";
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

export const updateEmailConfiguration = createAsyncThunk(
  "EmailConfiguration/updateEmailConfiguration",
  async (args, { dispatch, getState }) => {
    return await AxiosConfig.put(`${API_PREFIX}updateEmailConfiguration`, args)
      .then((res) => {
        if (res.data.responseCode === responseCode.Success)
          res.data.message = "Email Configuration updated successfully!";
        responseMessage({ dispatch, data: res.data });
        return res.data;
      })
      .catch((err) => {
        responseMessage({
          dispatch: dispatch,
          type: responseMessageType.ApiFailure,
        });
        return err;
      });
  }
);

export const removeEmailConfiguration = createAsyncThunk(
  "EmailConfiguration/removeEmailConfiguration",
  async (args, { dispatch, getState }) => {
    return await AxiosConfig.delete(
      `${API_PREFIX}removeEmailConfiguration?id=${args.id}`
    )
      .then((res) => {
        if (res.data.responseCode === responseCode.Success) {
          res.data.message = "Email Configuration removed successfully!";
          dispatch(emailConfigurationDeleted(args));
        }
        responseMessage({ dispatch, data: res.data });
        return res.data;
      })
      .catch((err) => {
        responseMessage({
          dispatch: dispatch,
          type: responseMessageType.ApiFailure,
        });
        return err;
      });
  }
);
