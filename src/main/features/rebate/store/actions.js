import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import {
  getAllEmployeeRebateService,
  addEmployeeRebateService,
  updateEmployeeRebateService,
  removeEmployeeRebateService,
} from "../services/service";

export const getAllEmployeeRebate = createAsyncThunk(
  "EmployeeRebate/getAllEmployeeRebate",
  async (args, { dispatch }) => {
    const res = await getAllEmployeeRebateService(args);
    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const addEmployeeRebate = createAsyncThunk(
  "EmployeeRebate/addEmployeeRebate",
  async (args, { dispatch }) => {
    const res = await addEmployeeRebateService(args);
    if (res.responseCode && res.responseCode === responseCode.Success) {
      message.success("Employee rebate added successfully!");
      responseMessage({ dispatch, data: res });
    } else {
      message.error(res.message);
    }
    return res;
  }
);

export const updateEmployeeRebate = createAsyncThunk(
  "EmployeeRebate/updateEmployeeRebate",
  async (args, { dispatch }) => {
    const res = await updateEmployeeRebateService(args);

    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        message.success("Employee rebate updated successfully!");
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

export const removeEmployeeRebate = createAsyncThunk(
  "EmployeeRebate/removeEmployeeRebate",
  async (args, { dispatch }) => {
    const res = await removeEmployeeRebateService(args.id);

    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        res.message = "Employee Rebate removed successfully!";
      // dispatch(getAllRebateCategories());
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
