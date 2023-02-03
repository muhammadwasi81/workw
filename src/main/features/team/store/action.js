import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseType } from "../../../../utils/api/ResponseResult";
import { jsonToFormData, STRINGS } from "../../../../utils/base";
import { openNotification } from "../../../../utils/Shared/store/slice";
import {
  getAllTeamsService,
  getAllRewardService,
  getAllLoanService,
  getAllComplainService,
  getAllWarningService,
  getAllLeaveService,
  getAllCheckInService,
  getAllCoursesService,
  getAllAppraisalService,
  getDeviceInfoService,
} from "../services/service";

export const getTeamsAction = createAsyncThunk(
  "teamSlice/getTeamsAction",
  async (payload, { rejectWithValue, dispatch }) => {
    const response = await getAllTeamsService(payload);
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

export const getAppraisalsAction = createAsyncThunk(
  "teamSlice/getAppraisalsAction",
  async (id, { rejectWithValue, dispatch }) => {
    const response = await getAllAppraisalService(id);
    console.log(id, "appraisals action");
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


export const getCourseAction = createAsyncThunk(
  "teamSlice/getCourseAction",
  async (id, { rejectWithValue, dispatch }) => {
    const response = await getAllCoursesService(id);
    console.log(id, "Course action");
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

export const getAllWarningAction = createAsyncThunk(
  "teamSlice/getAllWarningAction ",
  async (id, { rejectWithValue, dispatch }) => {
    const response = await getAllWarningService(id);
    console.log(response, "warning SERVICE");
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
export const getAllLeaveAction = createAsyncThunk(
  "teamSlice/getAllLeaveAction",
  async (id, { rejectWithValue, dispatch }) => {
    const response = await getAllLeaveService(id);
    console.log(id, "Leaves Service");
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

export const getAllCheckInAction = createAsyncThunk(
  "teamSlice/getAllCheckInAction",
  async (id, { rejectWithValue, dispatch }) => {
    const response = await getAllCheckInService(id);
    console.log(id, "CheckIn SERVICE");
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


export const getDeviceInfoAction = createAsyncThunk(
  'teamSlice/getDeviceInfoAction',
  async (id, { dispatch, rejectWithValue }) => {
    const response = await getDeviceInfoService(id);
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
