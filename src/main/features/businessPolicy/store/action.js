import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import {
  addBusinessPolicyService,
  removeBusinessPolicyService,
  getAllBusinessPolicyService,
  updateBusinessPolicyService,
} from "../services/service";
import { businessDeleted } from "./slice";

export const addBusinessPolicy = createAsyncThunk(
  "addBusiness",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await addBusinessPolicyService(data);

    if (res.responseCode === responseCode.Success) {
      return res;
    } else {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
      return rejectWithValue("Something went wrong");
    }
  }
);

export const getAllBusinessPolicy = createAsyncThunk(
  "getAllBusinessPolicy",
  async (data, { dispatch, getState }) => {
    const res = await getAllBusinessPolicyService(data);
    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    // console.log("response after getting access role", res);
    return res;
  }
);

export const removeBusinessPolicy = createAsyncThunk(
  "removeBusinessPolicy",
  async (args, { dispatch, rejectWithValue }) => {
    const res = await removeBusinessPolicyService(args);

    if (res.responseCode === responseCode.Success) {
      dispatch(businessDeleted(args));
      return res;
    } else {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
      return rejectWithValue("Something went wrong");
    }
  }
);

export const updateBusinessPolicy = createAsyncThunk(
  "updateBusinessPolicy",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await updateBusinessPolicyService(data);
    if (res.responseCode === responseCode.Success) {
      return res;
    } else {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
      return rejectWithValue("Something went wrong");
    }
  }
);
