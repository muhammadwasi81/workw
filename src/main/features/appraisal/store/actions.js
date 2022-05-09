import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import AxiosConfig from "../../../../utils/services/AxiosConfig";
import { addAppraisalService, getAllAppraisalService } from "../services/service";
import { appraisalDeleted } from "./slice";

const API_PREFIX = "konnectapi/api/appraisal/appraisalQuestion/";

export const getAllQuestion = createAsyncThunk(
  "appraisalQuestion/getAllQuestion",
  async (args, { dispatch, getState }) => {
    const res = await getAllAppraisalService();
    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const addQuestion = createAsyncThunk(
  "appraisalQuestion/addQuestion",
  async (args, { dispatch, getState }) => {
    const res = await addAppraisalService(args);

    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        res.message = "Appraisal added successfully!";
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

export const updateQuestion = createAsyncThunk(
  "appraisalQuestion/updateQuestion",
  async (args, { dispatch, getState }) => {
    return await AxiosConfig.put(`${API_PREFIX}updatequestion`, args)
      .then((res) => {
        if (res.data.responseCode === responseCode.Success)
          res.data.message = "Appraisal updated successfully!";
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

export const removeQuestion = createAsyncThunk(
  "appraisalQuestion/removeQuestion",
  async (args, { dispatch, getState }) => {
    return await AxiosConfig.delete(`${API_PREFIX}removequestion?id=${args.id}`)
      .then((res) => {
        if (res.data.responseCode === responseCode.Success) {
          res.data.message = "Appraisal removed successfully!";
          dispatch(appraisalDeleted(args));
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
