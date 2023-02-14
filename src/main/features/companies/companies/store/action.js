import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseType } from "../../../../../utils/api/ResponseResult";
// import { jsonToFormData, STRINGS } from "../../../../../../utils/base";
import { openNotification } from "../../../../../utils/Shared/store/slice";
import {
  getAllCompanyService,
  getAllRewardService,
  getAllLoanService,
  getAllComplainService,
  getAllSignupService,
} from "../services/service";

export const getCompanyAction = createAsyncThunk(
  "getComapnyAction",
  async (payload, { rejectWithValue, dispatch }) => {
    const response = await getAllCompanyService(payload);
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
  async (id, { rejectWithValue, dispatch }) => {
    const response = await getAllRewardService(id);
    console.log(id, "rewards action");
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
  async (id, { rejectWithValue, dispatch }) => {
    const response = await getAllLoanService(id);
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

export const getAllComplainAction = createAsyncThunk(
  "teamSlice/ getAllComplainAction",
  async (id, { rejectWithValue, dispatch }) => {
    const response = await getAllComplainService(id);
    // console.log(response, "complain SERVICE");
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

export const getAllSignupAction = createAsyncThunk(
  "teamSlice/ getAllSignupAction",
  async (payload, { rejectWithValue, dispatch }) => {
    const response = await getAllSignupService(payload);
    console.log(response, "getAllSignupAction");

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
