import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../../services/enums/responseCode";
import MasterConfig from "../../../../../utils/services/MasterConfig";

import {
  responseMessage,
  responseMessageType,
} from "../../../../../services/slices/notificationSlice";
import AxiosConfig from "../../../../../utils/services/AxiosConfig";
import { addWarningCategoryService, getAllWarningCategoriesService } from "../services/service";
import { warningCategoryDeleted } from "./slice";

const API_PREFIX = "konnectapi/api/Administration/WarningCategory/";

export const getAllWarningCategories = createAsyncThunk(
  "WarningCategory/GetAllWarningCategory",
  async (args, { dispatch, getState }) => {
    console.log(args, "bye")
    const res = await getAllWarningCategoriesService();
    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const addWarningCategory = createAsyncThunk(
  "WarningCategory/addWarningCategory",
  async (args, { dispatch, getState }) => {
    const res = await addWarningCategoryService(args);

    if (res.responseCode) {
      if (res.responseCode === responseCode.Success) {
        message.success("Warning Category added successfully!")
        responseMessage({ dispatch, data: res });
      } else {
        message.error(res.message)
      }
    } else {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }

    return res;
  }
);

export const updateWarningCategory = createAsyncThunk(
  "WarningCategory/updateWarningCategory",
  async (args, { dispatch, getState }) => {
    return await MasterConfig.put(`api/WarningCategory/updateWarningCategory`, args)
      .then((res) => {
        if (res.data.responseCode === responseCode.Success) {
          message.success("Warning Category updated successfully!")
          responseMessage({ dispatch, data: res.data });
          return res.data;
        } else {
          message.error(res.data.message)
        }
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

export const removeWarningCategory = createAsyncThunk(
  "WarningCategory/removeWarningCategory",
  async (args, { dispatch, getState }) => {
    return await MasterConfig.delete(`api/WarningCategory/removeWarningCategory?id=${args.id}`)
      .then((res) => {
        if (res.data.responseCode === responseCode.Success) {
          message.success("Warning Category removed successfully!")
          dispatch(warningCategoryDeleted(args));
          responseMessage({ dispatch, data: res.data });
          return res.data;
        } else {
          message.success(res.data.message)
        }
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
