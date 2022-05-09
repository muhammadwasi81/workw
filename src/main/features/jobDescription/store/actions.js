import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import AxiosConfig from "../../../../utils/services/AxiosConfig";
import { addJobDescriptionService, getAllJobDescriptionService } from "../services/service";
import { jobDescriptionDeleted } from "./slice";

const API_PREFIX = "konnectapi/api/Designation/";

export const getAllJobDescription = createAsyncThunk(
  "Designation/getAllDesignation",
  async (args, { dispatch, getState }) => {
    const res = await getAllJobDescriptionService();

    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const addJobDescription = createAsyncThunk(
  "Designation/addDesignation",
  async (args, { dispatch, getState }) => {
    const res = await addJobDescriptionService(args);
    console.log(args,"args")

    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        res.message = "Job Description added successfully!";
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

export const updateJobDescription = createAsyncThunk(
  "Designation/updateDesignation",
  async (args, { dispatch, getState }) => {
    return await AxiosConfig.put(`${API_PREFIX}updateDesignation`, args)
      .then((res) => {
        if (res.data.responseCode === responseCode.Success)
          res.data.message = "Job Description updated successfully!";
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

export const removeJobDescription = createAsyncThunk(
  "Designation/removeDesignation",
  async (args, { dispatch, getState }) => {
    return await AxiosConfig.delete(`${API_PREFIX}removeDesignation?id=${args.id}`)
      .then((res) => {
        if (res.data.responseCode === responseCode.Success) {
          res.data.message = "Job Description removed successfully!";
          dispatch(jobDescriptionDeleted(args));
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
