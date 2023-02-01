import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import { openNotification } from "../../../../utils/Shared/store/slice";
import { updateUserEmployeeContactService } from "../../emergencyInfo/service/service";
import { removeFamilyMember, deleteEmployeeAttachment } from "./slice";

import {
  addEmployeeService,
  getAllEmployeesService,
  getEmployeeByIdService,
  updateEmployeeService,
  addEmployeeFamilyService,
  getAllEmployeeFamilyService,
  removeEmployeeFamilyService,
  updateEmployeeFamilyService,
  addEmployeeDetailAttachmentService,
  getAllEmployeeDetailAttachmentService,
  removeEmployeeDetailAttachmentService,
} from "../services/service";

export const addEmployee = createAsyncThunk(
  "addEmployee",
  async ({ data, resetAllFields }, { dispatch, getState, rejectWithValue }) => {
    const res = await addEmployeeService(data);

    if (res?.responseCode === responseCode.Success) {
      dispatch(
        openNotification({
          message: "Employee Added Successfully",
          type: "success",
          duration: 2,
        })
      );
      for (let obj in resetAllFields) {
        resetAllFields[obj].resetFields();
      }
      return res;
    } else {
      dispatch(
        openNotification({
          message: res.message,
          type: "error",
          duration: 2,
        })
      );
      return isRejectedWithValue(res.message);
    }
  }
);

export const addEmployeeFamily = createAsyncThunk(
  "addEmployeeFamily",
  async (data, { dispatch, getState, rejectWithValue }) => {
    console.log(data, "in actions");
    const res = await addEmployeeFamilyService(data);

    if (res?.responseCode === responseCode.Success) {
      dispatch(
        openNotification({
          message: "Employee Family Added Successfully",
          type: "success",
          duration: 2,
        })
      );
      return res;
    } else {
      dispatch(
        openNotification({
          message: res.message,
          type: "error",
          duration: 2,
        })
      );
      return isRejectedWithValue(res.message);
    }
  }
);

export const updateEmployeeFamily = createAsyncThunk(
  "updateEmployeeFamily",
  async (data, { dispatch, getState, rejectWithValue }) => {
    console.log(data, "in actions");
    const res = await updateEmployeeFamilyService(data);

    if (res?.responseCode === responseCode.Success) {
      dispatch(
        openNotification({
          message: "Employee Family updated Successfully",
          type: "success",
          duration: 2,
        })
      );
      return res;
    } else {
      dispatch(
        openNotification({
          message: res.message,
          type: "error",
          duration: 2,
        })
      );
      return isRejectedWithValue(res.message);
    }
  }
);

export const getAllEmployeeFamilyAction = createAsyncThunk(
  "getAllEmployeeFamily",
  async (id, { dispatch, rejectWithValue }) => {
    const res = await getAllEmployeeFamilyService(id);
    console.log(res.data, "get all family ");
    if (res.responseCode === responseCode.Success) {
      return res;
    } else {
      responseMessage({
        dispatch: dispatch,
        data: res,
        type: responseMessageType.ApiFailure,
      });
      return rejectWithValue(res.message);
    }
  }
);

export const removeEmployeeFamily = createAsyncThunk(
  "removeEmployeeFamily",
  async (id, { dispatch, rejectWithValue }) => {
    const res = await removeEmployeeFamilyService(id);
    console.log(res, "remove family ");
    if (res.responseCode === responseCode.Success) {
      dispatch(removeFamilyMember(id));
      return res;
    } else {
      responseMessage({
        dispatch: dispatch,
        data: res,
        type: responseMessageType.ApiFailure,
      });
      return rejectWithValue(res.message);
    }
  }
);

export const getAllEmployees = createAsyncThunk(
  "getAllEmployees",
  async (data, { dispatch, getState, rejectWithValue }) => {
    console.log(data, "dataaa");
    const res = await getAllEmployeesService(data);
    if (res.responseCode === responseCode.Success) {
      return res;
    } else {
      responseMessage({
        dispatch: dispatch,
        data: res,
        type: responseMessageType.ApiFailure,
      });
      return rejectWithValue(res.message);
    }
  }
);

export const getEmployeeByIdAction = createAsyncThunk(
  "getEmployeeById",
  async (id, { dispatch, rejectWithValue }) => {
    const res = await getEmployeeByIdService(id);
    console.log(res.data, "getEmployeeByIdAction");
    if (res.responseCode === responseCode.Success) {
      return res;
    } else {
      responseMessage({
        dispatch: dispatch,
        data: res,
        type: responseMessageType.ApiFailure,
      });
      return rejectWithValue(res.message);
    }
  }
);

export const updateEmployeeAction = createAsyncThunk(
  "updateEmployee",
  async ({ data, resetAllFields }, { dispatch, getState, rejectWithValue }) => {
    console.log(data, "action");
    const res = await updateEmployeeService(data);
    console.log(res, "updateEmployeeAction");
    if (res.responseCode === responseCode.Success) {
      dispatch(
        openNotification({
          message: "Employee Updated Successfully",
          type: "success",
          duration: 2,
        })
      );
      for (let obj in resetAllFields) {
        resetAllFields[obj].resetFields();
      }
      return res;
    } else {
      dispatch(
        openNotification({
          message: res.message,
          type: "error",
          duration: 2,
        })
      );
      return isRejectedWithValue(res.message);
    }
  }
);

export const addEmployeeDetailAttachment = createAsyncThunk(
  "addEmployeeDetailAttachment",
  async (data, { dispatch, getState, rejectWithValue }) => {
    console.log(data, "in actions");
    const res = await addEmployeeDetailAttachmentService(data);

    if (res?.responseCode === responseCode.Success) {
      dispatch(
        openNotification({
          message: "Employee Attachment Added Successfully",
          type: "success",
          duration: 2,
        })
      );
      return res;
    } else {
      dispatch(
        openNotification({
          message: res.message,
          type: "error",
          duration: 2,
        })
      );
      return isRejectedWithValue(res.message);
    }
  }
);

export const getAllEmployeeDetailAttachment = createAsyncThunk(
  "getAllEmployeeDetailAttachment",
  async (id, { dispatch, rejectWithValue }) => {
    const res = await getAllEmployeeDetailAttachmentService(id);
    console.log(res.data, "getAllEmployeeDetailAttachmentService");
    if (res.responseCode === responseCode.Success) {
      return res;
    } else {
      responseMessage({
        dispatch: dispatch,
        data: res,
        type: responseMessageType.ApiFailure,
      });
      return rejectWithValue(res.message);
    }
  }
);

export const removeEmployeeDetailAttachment = createAsyncThunk(
  "removeEmployeeDetailAttachment",
  async (id, { dispatch, rejectWithValue }) => {
    const res = await removeEmployeeDetailAttachmentService(id);
    console.log(res.data, "removeEmployeeDetailAttachmentService");
    if (res.responseCode === responseCode.Success) {
      dispatch(deleteEmployeeAttachment(id));
      return res;
    } else {
      responseMessage({
        dispatch: dispatch,
        data: res,
        type: responseMessageType.ApiFailure,
      });
      return rejectWithValue(res.message);
    }
  }
);
