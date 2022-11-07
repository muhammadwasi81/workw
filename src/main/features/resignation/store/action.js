import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { addResignationService, getAllResignationService, getResignationyByIdService } from "../services/service";
import { responseCode } from "../../../../services/enums/responseCode";

export const getAllResignations = createAsyncThunk("Resignation/GetAllResignation", async (data) => {
  const response = await getAllResignationService(data);

  if (!response.responseCode) {
    message.error("Something went wrong");
  }
  return response.data;
});

export const addResignation = createAsyncThunk("Resgination/addResignation", async (data, { dispatch, getState, rejectWithValue }) => {
  const res = await addResignationService(data);
  if (res.data?.responseCode === responseCode.Success) {
    message.success('Resignation Created');
    return res;
  } else {
    message.error(res.data.message);
    return rejectWithValue(res.data.message);
  }
});

export const GetResignationById = createAsyncThunk("Resignation/GetResignationById", async (id) => {
  const response = await getResignationyByIdService(id);
  return response.data;
});