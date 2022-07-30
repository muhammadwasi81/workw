import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import { responseMessage, responseMessageType } from "../../../../services/slices/notificationSlice";
import { addRewardService, getAllRewardService, GetRewardByIdService } from "../services/service";

export const getAllRewards = createAsyncThunk("reward/GetAllReward", async (data) => {
  const response = await getAllRewardService(data);

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

export const addReward = createAsyncThunk("reward/addReward", async (data, { dispatch, setState }) => {
  console.log(data, "FROM ACTION");
  const response = await addRewardService(data);
  return response;
});
