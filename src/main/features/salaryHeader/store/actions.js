import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import AxiosConfig from "../../../../utils/services/AxiosConfig";
import { addSalaryHeaderService, getAllSalaryHeaderService } from "../services/service";
import { salaryHeaderDeleted } from "./slice";

const API_PREFIX = "konnectapi/api/salaryheader/";

export const getAllSalaryHeader = createAsyncThunk(
  "salaryheader/getAllSalaryHeader",
  async (args, { dispatch, getState }) => {
    const res = await getAllSalaryHeaderService();

    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const addSalaryHeader = createAsyncThunk(
  "salaryheader/addsalaryheader",
  async (args, { dispatch, getState }) => {
    const res = await addSalaryHeaderService(args);

    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        res.message = "Salary Header added successfully!";
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

export const updateSalaryHeader = createAsyncThunk(
  "salaryheader/updateSalaryHeader",
  async (args, { dispatch, getState }) => {
    return await AxiosConfig.put(`${API_PREFIX}updatesalaryheader`, args)
      .then((res) => {
        if (res.data.responseCode === responseCode.Success)
          res.data.message = "Salary Header updated successfully!";
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

export const removeSalaryHeader = createAsyncThunk(
  "salaryheader/removeSalaryHeader",
  async (args, { dispatch, getState }) => {
    return await AxiosConfig.delete(`${API_PREFIX}removesalaryheader?id=${args.id}`)
      .then((res) => {
        if (res.data.responseCode === responseCode.Success) {
          res.data.message = "Salary Header removed successfully!";
          dispatch(salaryHeaderDeleted(args));
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
