import {
  getAllGreadeAllowanceService,
  getGreadesService,
  addGradeAllowanceService,
  getAllGreadesAllowanceService,
} from "../service/service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice.js";
import { responseCode } from "../../../../services/enums/responseCode";
import MasterConfig from "../../../../utils/services/MasterConfig";

import { message } from "antd";

export const getGreadeAllowance = createAsyncThunk(
  "all/getGreadeAllowance",
  async (args, { dispatch }) => {
    const res = await getAllGreadeAllowanceService();
    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const getGreadeData = createAsyncThunk(
  "all/getGreadeData",
  async (args, { dispatch }) => {
    const res = await getGreadesService();
    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const addGradeAllowance = createAsyncThunk(
  "allowance/addGradeAllowance",
  async (args) => {
    const res = await addGradeAllowanceService(args);
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success) {
        message.success("Allowance added successfully!");
      } else {
        message.error(`Error: ${res.message}`);
      }
    }
    return res;
  }
);

export const getAllAllowanceGreadeData = createAsyncThunk(
  "api/all/getAllAllowanceGreadeData",
  async (args, { dispatch }) => {
    const res = await getAllGreadesAllowanceService();
    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const removeGradeAllowance = createAsyncThunk(
  "GradeAllowance/removeGradeAllowance",
  async (id, { dispatch, getState }) => {
    return await MasterConfig.delete(
      `api/Allowance/RemoveGradeAllowance?id=${id}`
    )
      .then((res) => {
        if (res.data.responseCode === responseCode.Success) {
          message.success("Grade Allowance removed successfully!");
          return res.data;
        } else {
          message.error(res.message);
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

export const updateGradeAllowance = createAsyncThunk(
  "updateGrade/updateGradeAllowance",
  async (args, { dispatch, getState }) => {
    return await MasterConfig.put(`api/Allowance/UpdateGradeAllowance`, args)
      .then((res) => {
        if (res.data.responseCode === responseCode.Success) {
          message.success("Grade Allowance updated successfully!");
          return res.data;
        } else {
          message.error(res.message);
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
