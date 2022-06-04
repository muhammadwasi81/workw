import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../../services/slices/notificationSlice";
import AxiosConfig from "../../../../../utils/services/AxiosConfig";
import { addLeaveTypeService, getAllLeaveTypeService } from "../services/service";
import { leaveTypeDeleted } from "./slice";

const API_PREFIX = "konnectapi/api/leave/leavetype/";

export const getAllLeaveType = createAsyncThunk(
  "leavetype/getAllleavetype",
  async (args, { dispatch, getState }) => {
    const res = await getAllLeaveTypeService();

    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const addLeaveType = createAsyncThunk(
  "leavetype/addleavetype",
  async (args, { dispatch, getState }) => {
    const res = await addLeaveTypeService(args);
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        res.message = "Leave Type added successfully!";
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

export const updateLeaveType = createAsyncThunk(
  "leavetype/updateleavetype",
  async (args, { dispatch, getState }) => {
    return await AxiosConfig.put(`${API_PREFIX}updateleavetype`, args)
      .then((res) => {
        if (res.data.responseCode === responseCode.Success)
          res.data.message = "Leave Type updated successfully!";
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

export const removeLeaveType = createAsyncThunk(
  "leavetype/removeleavetype",
  async (args, { dispatch, getState }) => {
    return await AxiosConfig.delete(`${API_PREFIX}removeleavetype?id=${args.id}`)
      .then((res) => {
        if (res.data.responseCode === responseCode.Success) {
          res.data.message = "Leave Type removed successfully!";
          dispatch(leaveTypeDeleted(args));
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
