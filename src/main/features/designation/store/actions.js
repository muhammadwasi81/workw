import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import {
  addDesignationService,
  getAllDesignationsService,
  removeDesignationService,
  updateDesignationService,
} from "../services/service";
import { message } from "antd";

export const getAllDesignation = createAsyncThunk(
  "Designation/getAllDesignation",
  async (args, { dispatch }) => {
    const res = await getAllDesignationsService();
    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const addDesignation = createAsyncThunk(
  "Designation/addDesignation",
  async (args, { dispatch }) => {
    const res = await addDesignationService(args);
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        message.success(`Designation Added Successfully`);
      responseMessage({ dispatch, data: res });
    } else {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
      message.error(`Error: ${res.responseMessage}`);
    }
    return res;
  }
);

export const updateDesignation = createAsyncThunk(
  "Designation/updatedesignation",
  async (args, { dispatch }) => {
    const res = await updateDesignationService(args);
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        message.success(`Designation updated successfully!`);
      responseMessage({ dispatch, data: res });
    } else {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
      message.error(`Error: ${res.responseMessage}`);
    }
    return res;
  }
);

export const removeDesignation = createAsyncThunk(
  "Designation/removeDesignation",
  async (args, { dispatch }) => {
    console.log(args.id, "fddfdfs");
    const res = await removeDesignationService(args.id);
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        message.success("Designation removed successfully!");
      responseMessage({ dispatch, data: res });
    } else {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
      message.error(`Error: ${res.responseMessage}`);
    }
    return res;
  }
);
