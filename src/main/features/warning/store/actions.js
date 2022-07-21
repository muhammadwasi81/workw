import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import { responseMessage, responseMessageType } from "../../../../services/slices/notificationSlice";
import { addWarningService, getAllWarningService, GetWarningByIdService } from "../services/service";

export const getAllWarnings = createAsyncThunk("Warning/GetAllWarning", async (data) => {
  const response = await getAllWarningService(data);
  console.log(response, "ALL Warnings");
  if (!response.responseCode) {
    message.error("Something went wrong");
  }
  return response.data;
});

export const addWarning = createAsyncThunk("Warning/addWarning", async (args, { dispatch, setState }) => {
  const response = await addWarningService(args);
  return response;
});

export const GetWarningById = createAsyncThunk("Warning/GetWarningById", async (id) => {
  const response = await GetWarningByIdService(id);
  console.log("MY ID", id);
  return response.data;
});
