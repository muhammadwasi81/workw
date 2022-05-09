import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import AxiosConfig from "../../../../utils/services/AxiosConfig";
import { addAllowanceService, getAllAllowanceService } from "../services/service";
import { allowanceDeleted } from "./slice";

const API_PREFIX = "konnectapi/api/allowance/";

export const getAllAllowance = createAsyncThunk(
  "allowance/GetAllAllowance",
  async (args, { dispatch, getState }) => {
    const res = await getAllAllowanceService();

    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const addAllowance = createAsyncThunk(
  "allowance/addAllowance",
  async (args, { dispatch, getState }) => {
    const res = await addAllowanceService(args);

    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        res.message = "Allowance added successfully!";
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

export const updateAllowance = createAsyncThunk(
  "allowance/updateAllowance",
  async (args, { dispatch, getState }) => {
    return await AxiosConfig.put(`${API_PREFIX}updateallowance`, args)
      .then((res) => {
        if (res.data.responseCode === responseCode.Success)
          res.data.message = "Allowance updated successfully!";
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

export const removeAllowance = createAsyncThunk(
  "allowance/removeallowance",
  async (args, { dispatch, getState }) => {
    return await AxiosConfig.delete(`${API_PREFIX}removeallowance?id=${args.id}`)
      .then((res) => {
        if (res.data.responseCode === responseCode.Success) {
          res.data.message = "Allowance removed successfully!";
          dispatch(allowanceDeleted(args));
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
