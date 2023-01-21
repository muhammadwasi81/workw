import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import AxiosConfig from "../../../../utils/services/AxiosConfig";
import {
  addUserEmailConfigurationService,
  getAllUserEmailConfigurationsService,
  getAllBussinessEmailConfigurationService,
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
  "UserEmailConfiguration/getBussinessEmailconfiguration",
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
        res.message = "Email user Configuration added successfully!";
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
