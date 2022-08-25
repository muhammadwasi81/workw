import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import { responseMessage, responseMessageType } from "../../../../services/slices/notificationSlice";
import { addLeaveService, getAllLeaveService, GetRewardByIdService } from "../services/service";

export const getAllLeaves = createAsyncThunk("leaves/GetAllLeave", async (data) => {
  const response = await getAllLeaveService(data);

  if (!response.responseCode) {
    message.error("Something went wrong");
  }
  return response.data;
});

export const GetLeaveById = createAsyncThunk("Leave/GetLeaveById", async (id) => {
  const response = await GetLeaveById(id);
  return response.data;
});

export const addLeave = createAsyncThunk("leaves/addLeave", async (args, { dispatch, setState }) => {
  const response = await addLeaveService(args);
  return response;
});
