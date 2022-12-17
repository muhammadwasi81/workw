import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import { openNotification } from "../../../../utils/Shared/store/slice";
import {
  addRewardService,
  cancelRewardService,
  getAllRewardService,
  GetRewardByIdService,
} from "../services/service";
import { cancelRewardSuccess } from "./slice";

export const getAllRewards = createAsyncThunk(
  "reward/GetAllReward",
  async (data) => {
    const response = await getAllRewardService(data);

    if (!response.responseCode) {
      message.error("Something went wrong");
    }
    return response.data;
  }
);

export const GetRewardById = createAsyncThunk(
  "Reward/GetRewardById",
  async (id) => {
    const response = await GetRewardByIdService(id);
    console.log("MY ID", id);
    return response.data;
  }
);

export const addReward = createAsyncThunk(
  "reward/addReward",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await addRewardService(data);
    console.log(res.data.message, "RESPONSE");
    if (res.data?.responseCode === responseCode.Success) {
      message.success("Reward Created");
      return res;
    } else {
      message.error(res.data.message);
      return rejectWithValue(res.data.message);
    }
  }
);

export const cancelReward = createAsyncThunk(
  "reward/cancelReward",
  async (data, { dispatch, setState, rejectWithValue }) => {
    const response = await cancelRewardService(data);
    if (response.data.responseCode === 1001) {
      message.success("Reward is cancelled");  
      dispatch(cancelRewardSuccess({ rewardId: data }));
      return response;
    } else {
      message.error(response.data.message);
      return rejectWithValue(response.data.message);
    }
    return response;
  }
);
