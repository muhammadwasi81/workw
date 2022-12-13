import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import MasterConfig from "../../../../utils/services/MasterConfig";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import AxiosConfig from "../../../../utils/services/AxiosConfig";
import {
  addJobDescriptionService,
  getAllJobDescriptionService,
} from "../services/service";
import { JobDescriptionDeleted } from "./slice";

const API_PREFIX = "konnectapi/api/Designation/";

export const getAllJobDescription = createAsyncThunk(
  "JobDescription/getAllJobDescription",
  async (args, { dispatch }) => {
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
  "JobDescription/addJobDescription",
  async (args, { dispatch }) => {
    const res = await addJobDescriptionService(args);
    console.log(args, "args");

    if (res.responseCode) {
      if (res.responseCode === responseCode.Success) {
        message.success("Job Description added successfully!");
        responseMessage({ dispatch, data: res });
      } else {
        message.error(res.message);
      }
    } else {
      message.error("Something went wrong");
    }

    return res;
  }
);

export const updateJobDescription = createAsyncThunk(
  "Designation/updateDesignation",
  async (args, { dispatch }) => {
    return await MasterConfig.put(
      `api/JobDescription/updateJobDescription`,
      args
    )
      .then((res) => {
        console.log(res.data.message, "RESPONE DASDASDAADS");
        if (res.data.responseCode) {
          if (res.data.responseCode === responseCode.Success) {
            message.success("Job Description updated successfully");
            responseMessage({ dispatch, data: res.data });
            return res.data;
          } else {
            message.error(res.data.message);
          }
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

export const removeJobDescription = createAsyncThunk(
  "JobDescription/removeJobDescription",
  async (args, { dispatch }) => {
    return await MasterConfig.delete(
      `api/JobDescription/removeJobDescription?id=${args.id}`
    )
      .then((res) => {
        console.log(res.data, "removeJobDescription");
        if (res.data.responseCode === responseCode.Success) {
          message.success("Job Description removed successfully!");
          dispatch(JobDescriptionDeleted({ id: args }));
          return res.data;
        } else {
          message.error(res.message);
        }
      })
      .catch((err) => {
        return err;
      });
  }
);
