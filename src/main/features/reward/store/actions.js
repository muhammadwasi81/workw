import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import { addRewardService, cancelRewardService, getAllRewardService, GetRewardByIdService } from "../services/service";

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
  const res = await addRewardService(data);
  if (res.data?.responseCode === responseCode.Success) {
    message.success('Reward Created');
    return res;
  } else {
    return message.error(res.data.message)
  }
});

export const cancelReward = createAsyncThunk("reward/cancelReward", async (id, { dispatch, setState }) => {
  const response = await cancelRewardService(id);
  return response;
});
