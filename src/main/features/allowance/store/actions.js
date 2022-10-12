import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import MasterConfig from "../../../../utils/services/MasterConfig";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import { addAllowanceService, getAllAllowanceService } from "../services/service";
import { allowanceDeleted } from "./slice";
import { message } from "antd";

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
      if (res.responseCode === responseCode.Success) {
        message.success("Allowance added successfully!")
      } else {
        message.error(res.message)
      }
    } else {
      message.error("Something went wrong")
    }
    return res;
  }
);

export const updateAllowance = createAsyncThunk(
  "allowance/updateAllowance",
  async (args, { dispatch, getState }) => {
    return await MasterConfig.put(`api/allowance/updateAllowance`, args)
      .then((res) => {
        if (res.responseCode) {
          if (res.data.responseCode === responseCode.Success) {
            message.success("Allowance updated successfully!")
            return res.data;
          } else {
            message.error(res.message)
          } 
        } else {
          message.error("Something went wrong")
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

export const removeAllowance = createAsyncThunk(
  "allowance/removeallowance",
  async (args, { dispatch, getState }) => {
    return await MasterConfig.delete(`api/allowance/removeallowance?id=${args.id}`)
      .then((res) => {
        if (res.data.responseCode === responseCode.Success) {
          message.success("Allowance removed successfully!")
          dispatch(allowanceDeleted(args));
        } else {
          message.error(res.message)
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
