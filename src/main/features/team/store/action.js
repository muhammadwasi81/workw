import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseType } from "../../../../utils/api/ResponseResult";
import { jsonToFormData, STRINGS } from "../../../../utils/base";
import { openNotification } from "../../../../utils/Shared/store/slice";
import {
  getAllTeamsService,
  getAllRewardService,
  getAllLoanService,
} from "../services/service";

export const getTeamsAction = createAsyncThunk(
  "teamSlice/getTeamsAction",
  async (payload, { rejectWithValue, dispatch }) => {
    const response = await getAllTeamsService();
    // console.log(response, "TEAM SERVICE");
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        dispatch(
          openNotification({
            // message: "Team added Successfully!",
            type: "success",
            //   duration: 2
          })
        );
        return response.data;
      default:
        return;
    }
  }
);

export const getRewardsAction = createAsyncThunk(
  "teamSlice/getRewardsAction",
  async (payload, { rejectWithValue, dispatch }) => {
    const response = await getAllRewardService(payload);
    console.log(response, "rewards SERVICE");
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        dispatch(
          openNotification({
            // message: "Team added Successfully!",
            type: "success",
            //   duration: 2
          })
        );
        return response.data;
      default:
        return;
    }
  }
);

export const getAllLoanAction = createAsyncThunk(
  "teamSlice/ getAllLoanAction",
  async (payload, { rejectWithValue, dispatch }) => {
    const response = await getAllLoanService(payload);
    console.log(response, "loan SERVICE");
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        dispatch(
          openNotification({
            // message: "Team added Successfully!",
            type: "success",
            //   duration: 2
          })
        );
        return response.data;
      default:
        return;
    }
  }
);
