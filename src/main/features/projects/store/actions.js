import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import { responseMessage, responseMessageType } from "../../../../services/slices/notificationSlice";
import { addDepartmentService, getAllDepartmentService, GetRewardByIdService } from "../services/service";

export const getAllDepartments = createAsyncThunk("reward/GetAllReward", async (data) => {
  const response = await getAllDepartmentService(data);

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

export const addDepartment = createAsyncThunk("Department/addDepartment", async (args, { dispatch, setState }) => {
  const response = await addDepartmentService(args);
  console.log(args, "FROM ACTION");
  return response;
});
