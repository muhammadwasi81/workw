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

export const GetRewardById = createAsyncThunk("Reward/GetRewardById", async (id) => {
  const response = await GetRewardByIdService(id);
  console.log("MY ID", id);
  return response.data;
});

export const addLeave = createAsyncThunk("leaves/addLeave", async (args, { dispatch, setState }) => {
  const response = await addLeaveService(args);
  console.log(args, "FROM ACTION");
  return response;
});
