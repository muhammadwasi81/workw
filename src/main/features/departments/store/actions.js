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
  // GetRewardByIdService,
} from "../services/service";

export const getAllDepartments = createAsyncThunk(
  "Department/getAllDepartment",
  async (data) => {
    const response = await getAllDepartmentService(data);

    if (!response.responseCode) {
      message.error("Something went wrong");
    }
    // console.log("response data from actions", response.data);
    return response.data;
  }
);

// export const addDepartment = createAsyncThunk(
//   "Department/addDepartment",
//   async (args, { dispatch, setState }) => {
//     console.log("data in async thunk", args);
//     const response = await addDepartmentService(args);

//     return response;
//   }
// );

export const addDepartment = createAsyncThunk(
  "Department/addDepartment",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await addDepartmentService(data);
    // console.log(res, "response adddeparment");
    // console.log(res.statusText, "RESPONSE");
    if (res.data?.responseCode === responseCode.Success) {
      message.success("Reward Created");
      return res;
    } else {
      message.error(res.statusText);
      return rejectWithValue(res.statusText);
    }
  }
);
