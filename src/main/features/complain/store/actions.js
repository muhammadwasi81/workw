import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import { responseMessage, responseMessageType } from "../../../../services/slices/notificationSlice";
import { addComplainService, cancelComplainService, getAllComplainService, getComplainByIdService } from "../services/service";

export const getAllComplains = createAsyncThunk("Complain/GetAllComplain", async (data) => {
  const response = await getAllComplainService(data);
  if (!response.responseCode) {
    message.error("Something went wrong");
  }
  return response.data;
});

export const addComplain = createAsyncThunk("Complain/addComplain", async (args, { dispatch, setState }) => {
  const response = await addComplainService(args);
  return response;
});

export const GetComplainById = createAsyncThunk("Complain/GetComplainById", async (id) => {
  const response = await getComplainByIdService(id);
  console.log("MY ID", id);
  return response.data;
});

export const cancelComplain = createAsyncThunk("complain/cancelComplain", async (id, { dispatch, setState }) => {
  const response = await cancelComplainService(id);
  return response;
});