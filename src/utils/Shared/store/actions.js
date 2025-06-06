import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  responseMessage,
  responseMessageType,
} from "../../../services/slices/notificationSlice";

import {
  getAllRewardCategoryService,
  getAllGendersService,
  getAllMaritalStatusService,
  getAllUserTitlesService,
  getAllUserTypesService,
  getCitiesService,
  getCountriesService,
  getDefaultDesignationService,
  uploadImageService,
  getAllBussinessFeaturesService,
  getAllEmployeeTypesService,
  getAllComplainCategoryService,
  getAllEmployeeService,
  getAllEmployeeShortService,
  getEmployeeSalaryService,
  disableEmployeeService,
  getAllNotificationCount,
} from "../services/services";
import { message } from "antd";

export const getCountries = createAsyncThunk(
  "getCountries",
  async (textData, { dispatch, getState }) => {
    const res = await getCountriesService();
    console.log(res, "COUNTRIES DATA");
    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const getCities = createAsyncThunk(
  "getCities",
  async (obj, { dispatch, getState }) => {
    // console.log("obj", obj);
    const res = await getCitiesService(obj);
    console.log(res, "CITIES DATA");
    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const getEmployeeSalary = createAsyncThunk(
  "getEmployeeSalary",
  async (data, { dispatch, getState }) => {
    const res = await getEmployeeSalaryService(data);
    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const getAllDefaultDesignation = createAsyncThunk(
  "getDefaultDesignation",
  async (args, { dispatch, getState }) => {
    const res = await getDefaultDesignationService();
    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const getAllUserTypes = createAsyncThunk(
  "getAllUserTypes",
  async (args, { dispatch, getState }) => {
    const res = await getAllUserTypesService();
    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);
export const getAllUserTitles = createAsyncThunk(
  "getAllUserTitles",
  async (args, { dispatch, getState }) => {
    const res = await getAllUserTitlesService();
    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const getAllGenders = createAsyncThunk(
  "getAllGenders",
  async (args, { dispatch, getState }) => {
    const res = await getAllGendersService();
    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);
export const getAllEmployeeShort = createAsyncThunk(
  "getAllEmployeeShort",
  async (args, { dispatch }) => {
    const { pageNo, pageSize, disableFilter, search } = args;
    const res = await getAllEmployeeShortService(
      pageNo,
      pageSize,
      disableFilter,
      search
    );
    console.log("getAllEmployeeShortAction", res.data);
    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);
export const getAllEmployees = createAsyncThunk(
  "getAllEmployee",
  async (args, { dispatch, getState }) => {
    const { text, pgNo, pgSize } = args;
    const res = await getAllEmployeeService(text, pgNo, pgSize);

    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);
export const getAllMaritalStatus = createAsyncThunk(
  "getAllMaritalStatus",
  async (args, { dispatch, getState }) => {
    const res = await getAllMaritalStatusService();
    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);
export const getAllBussinessFeatures = createAsyncThunk(
  "getAllBussinessFeatures",
  async (args, { dispatch, getState }) => {
    const res = await getAllBussinessFeaturesService();
    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);
export const getAllEmployeeTypes = createAsyncThunk(
  "getAllEmployeeTypes",
  async (args, { dispatch, getState }) => {
    const res = await getAllEmployeeTypesService();
    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);
export const uploadImage = createAsyncThunk(
  "Upload/UploadFiles",
  async (data) => {
    console.log("data from component", data);

    const response = await uploadImageService(data);
    return response.data;
  }
);

export const getRewardCategory = createAsyncThunk(
  "rewardcategory/getallrewardcategory",
  async (data) => {
    const response = await getAllRewardCategoryService(data);
    return response.data;
  }
);

export const getComplainCategory = createAsyncThunk(
  "ComplainCategory/getAllComplainCategory",
  async (data) => {
    const response = await getAllComplainCategoryService(data);
    return response.data;
  }
);

export const disableEmployee = createAsyncThunk(
  "employee/disableEmployee",
  async (payload, { dispatch }) => {
    const response = await disableEmployeeService(payload);
    console.log("disableEmployeeService", response.data);
    if (response.responseCode === 1001) {
      return response.data.isDisable === false
        ? message.success("Employee Enabled Successfully")
        : message.success("Employee Disabled Successfully");
    }
    if (!response.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return response;
  }
);

export const getAllNotification = createAsyncThunk(
  "notification/getAllNotification",
  async (args, { dispatch }) => {
    const res = await getAllNotificationCount();
    console.log("getAllNotification Action", res.data);
    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);
