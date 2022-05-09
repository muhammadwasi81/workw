import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import AxiosConfig from "../../../../utils/services/AxiosConfig";
import { addDesignationService, getAllDesignationsService } from "../services/service";
import { designationDeleted } from "./slice";

const API_PREFIX = "konnectapi/api/Designation/";

export const getAllDesignation= createAsyncThunk(
  "Designation/getAllDesignation",
  async (args, { dispatch, getState }) => {
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
  async (args, { dispatch, getState }) => {
    const res = await addDesignationService(args);

    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        res.message = "Designation added successfully!";
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

export const updateDesignation = createAsyncThunk(
  "Designation/updatedesignation",
  async (args, { dispatch, getState }) => {
    return await AxiosConfig.put(`${API_PREFIX}updatedesignation`, args)
      .then((res) => {
        if (res.data.responseCode === responseCode.Success)
          res.data.message = "Designation updated successfully!";
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

export const removeDesignation = createAsyncThunk(
  "Designation/removeDesignation",
  async (args, { dispatch, getState }) => {
    return await AxiosConfig.delete(`${API_PREFIX}removedesignation?id=${args.id}`)
      .then((res) => {
        if (res.data.responseCode === responseCode.Success) {
          res.data.message = "Designation removed successfully!";
          dispatch(designationDeleted(args));
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
