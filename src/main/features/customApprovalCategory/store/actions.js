import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import AxiosConfig from "../../../../utils/services/AxiosConfig";
import { addCustomApprovalCategoryService, getAllCustomApprovalCategoryService } from "../services/service";
import { customApprovalCategoryDeleted } from "./slice";

const API_PREFIX = "konnectapi/api/CustomApprovalCategory/";

export const getAllCustomApprovalCategory = createAsyncThunk(
  "CustomApprovalCategory/getAllCustomApprovalCategory",
  async (args, { dispatch, getState }) => {
    const res = await getAllCustomApprovalCategoryService();

    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const addCustomApprovalCategory = createAsyncThunk(
  "CustomApprovalCategory/addCustomApprovalCategory",
  async (args, { dispatch, getState }) => {
    const res = await addCustomApprovalCategoryService(args);

    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        res.message = "Custom Approval Category added successfully!";
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

export const updateCustomApprovalCategory = createAsyncThunk(
  "CustomApprovalCategory/updateCustomApprovalCategory",
  async (args, { dispatch, getState }) => {
    return await AxiosConfig.put(`${API_PREFIX}updateCustomApprovalCategory`, args)
      .then((res) => {
        if (res.data.responseCode === responseCode.Success)
          res.data.message = "Custom Approval Category updated successfully!";
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

export const removeCustomApprovalCategory = createAsyncThunk(
  "CustomApprovalCategory/removeCustomApprovalCategory",
  async (args, { dispatch, getState }) => {
    return await AxiosConfig.delete(`${API_PREFIX}removeCustomApprovalCategory?id=${args.id}`)
      .then((res) => {
        if (res.data.responseCode === responseCode.Success) {
          res.data.message = "Custom Approval Category removed successfully!";
          dispatch(customApprovalCategoryDeleted(args));
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
