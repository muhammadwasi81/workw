import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import {
  // addDepartmentService,
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
    console.log("response data from actions", response.data);
    return response.data;
  }
);

// export const addDepartment = createAsyncThunk(
//   "Department/addDepartment",
//   async (args, { dispatch, setState }) => {
//     const response = await addDepartmentService(args);
//     console.log(args, "FROM ACTION");
//     return response;
//   }
// );
