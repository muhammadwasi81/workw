import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import {
  addComplainService,
  cancelComplainService,
  getAllComplainService,
  getComplainByIdService,
} from "../services/service";

// export const getAllComplains = createAsyncThunk("Complain/GetAllComplain", async (data) => {
//   const res = await getAllComplainService(data);
//   if (!res.responseCode) {
//     message.error("Something went wrong");
//   }
//   return res.data;
// });

export const getAllComplains = createAsyncThunk(
  "GetAllComplain",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await getAllComplainService(data);
    if (res.responseCode === responseCode.Success) {
      return res.data;
    } else {
      return rejectWithValue(res.message);
    }
  }
);

export const addComplain = createAsyncThunk(
  "Complain/addComplain",
  async (data, { dispatch, setState, rejectWithValue }) => {
    const res = await addComplainService(data);
    if (res.data?.responseCode === responseCode.Success) {
      return res;
    } else {
      message.error(res.data.message);
      return rejectWithValue(res.message);
    }
  }
);

export const GetComplainById = createAsyncThunk(
  "Complain/GetComplainById",
  async (id) => {
    const response = await getComplainByIdService(id);
    return response.data;
  }
);

export const cancelComplain = createAsyncThunk(
  "complain/cancelComplain",
  async (id, { dispatch, setState }) => {
    const response = await cancelComplainService(id);
    return response;
  }
);
