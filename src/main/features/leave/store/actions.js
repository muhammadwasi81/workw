import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import {
  addLeaveService,
  getAllLeaveService,
  GetLeaveByIdService,
  GetRewardByIdService,
  GetLeaveTypeService,
  GetLeaveUserByIdService,
} from "../services/service";

export const getAllLeaves = createAsyncThunk(
  "leaves/GetAllLeave",
  async (data) => {
    const response = await getAllLeaveService(data);

    if (!response.responseCode) {
      message.error("Something went wrong");
    }
    return response.data;
  }
);

export const GetLeaveById = createAsyncThunk(
  "Leave/GetLeaveById",
  async (id) => {
    console.log(id, "FROM ACTION");
    const response = await GetLeaveByIdService(id);
    return response.data;
  }
);

export const GetLeaveUserById = createAsyncThunk(
  "Leave/getUserLeave",
  async (id) => {
    console.log(id, "FROM ACTION");
    const response = await GetLeaveUserByIdService(id);
    return response.data;
  }
);

export const addLeave = createAsyncThunk(
  "leaves/addLeave",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await addLeaveService(data);
    if (res.data?.responseCode === responseCode.Success) {
      message.success("Leave Created");
      return res;
    } else {
      message.error(res.data.message);
      return rejectWithValue(res.data.message);
    }
  }
);

export const GetLeaveTypeAction = createAsyncThunk(
  "Leave/GetLeaveUserById",
  async (args) => {
    console.log(args, "FROM ACTION");
    const response = await GetLeaveTypeService(args);
    return response.data;
  }
);
