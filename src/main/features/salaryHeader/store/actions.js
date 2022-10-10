import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import MasterConfig from "../../../../utils/services/MasterConfig";
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
      if (res.responseCode === responseCode.Success) {
        message.success("Salary Header added successfully!")
        return res
      } else {
        message.error(res.message)
      }
    } 

    return res;
  }
);

export const updateSalaryHeader = createAsyncThunk(
  "salaryheader/updateSalaryHeader",
  async (args, { dispatch, getState }) => {
    return await MasterConfig.put(`api/SalaryHeader/updatesalaryheader`, args)
      .then((res) => {
        if (res.data.responseCode === responseCode.Success) {
          message.success("Salary Header updated successfully!")
          return res.data
        } else {
          message.error(res.message)
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

export const removeSalaryHeader = createAsyncThunk(
  "salaryheader/removeSalaryHeader",
  async (args, { dispatch, getState }) => {
    return await MasterConfig.delete(`api/SalaryHeader/removesalaryheader?id=${args.id}`)
      .then((res) => {
        if (res.data.responseCode === responseCode.Success) { 
            message.success("Salary Header removed successfully!")
            return res.data;
        } else {
          message.error(res.message)
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
