import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import {
  addDepartmentService,
  getAllDepartmentService,
  GetDepartmentByIdService,
  getAllDepartmentAppraisalQuestionService,
  addDepartmentAppraisalQuestionService,
  updateDepartmentAppraisalQuestionService,
  removeDepartmentAppraisalQuestionService,
} from "../services/service";

export const getAllDepartments = createAsyncThunk(
  "Department/getAllDepartment",
  async (data) => {
    console.log(data);
    const response = await getAllDepartmentService(data);

    if (!response.responseCode) {
      message.error("Something went wrong");
    }
    // console.log("response data from actions", response.data);
    return response.data;
  }
);

export const getDepartmentById = createAsyncThunk(
  "Department/getDepartmentById",
  async (data) => {
    const response = await GetDepartmentByIdService(data);

    // if (!response.responseCode) {
    //   message.error("Something went wrong");
    // }
    // console.log("response data from actions", response.data);
    return response.data;
  }
);

export const addDepartment = createAsyncThunk(
  "Department/addDepartment",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await addDepartmentService(data);
    if (res.data?.responseCode === responseCode.Success) {
      message.success("Department Created");
      return res;
    } else {
      message.error(res.statusText);
      return rejectWithValue(res.statusText);
    }
  }
);

export const getAllDepartmentAppraisalQuestion = createAsyncThunk(
  "Department/getAllDepartmentAppraisalQuestion",
  async (data) => {
    const response = await getAllDepartmentAppraisalQuestionService(data);
    // console.log("*****", response);
    if (!response.responseCode) {
      message.error("Something went wrong");
    }
    console.log(response);
    return response.data;
  }
);

export const addDepartmentAppraisalQuestion = createAsyncThunk(
  "Department/addDepartmentAppraisalQuestion",
  async (data, { dispatch, getState, rejectWithValue }) => {
    // console.log("data in actions ", data);
    const res = await addDepartmentAppraisalQuestionService(data);
    if (res.data?.responseCode === responseCode.Success) {
      message.success("Appraisal Question Created");
      return res;
    } else {
      message.error(res.statusText);
      return rejectWithValue(res.statusText);
    }
  }
);

export const removeDepartmentAppraisalQuestion = createAsyncThunk(
  "Department/removeDepartmentAppraisalQuestion",
  async (data, { dispatch }) => {
    // console.log("data in actions ", data);
    const res = await removeDepartmentAppraisalQuestionService(data);
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        res.message = "Appraisal Question removed successfully!";
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

export const updateDepartmentAppraisalQuestion = createAsyncThunk(
  "Department/updateDepartmentAppraisalQuestion",
  async (data, { dispatch, getState, rejectWithValue }) => {
    // console.log(data, "data in update async");
    const res = await updateDepartmentAppraisalQuestionService(data);

    if (res.data.responseCode) {
      if (res.data.responseCode === responseCode.Success)
        message.success("Appraisal updated successfully!");
    } else {
      message.error(res.statusText);
      return rejectWithValue(res.statusText);
    }

    return res;
  }
);
