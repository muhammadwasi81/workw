import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../../services/slices/notificationSlice";
import AxiosConfig from "../../../../../utils/services/AxiosConfig";
import { addRewardCategoryService, getAllRewardCategoryService } from "../services/service";
import { rewardCategoryDeleted } from "./slice";

const API_PREFIX = "konnectapi/api/rewardcategory/";

export const getAllRewardCategory = createAsyncThunk(
  "rewardcategory/getallrewardcategory",
  async (args, { dispatch, getState }) => {
    const res = await getAllRewardCategoryService();

    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const addRewardCategory = createAsyncThunk(
  "rewardcategory/addrewardcategory",
  async (args, { dispatch, getState }) => {
    const res = await addRewardCategoryService(args);

    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        res.message = "Reward Category added successfully!";
      responseMessage({ dispatch, data: res });
    } else {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }

    return res;
  }
);

export const updateRewardCategory = createAsyncThunk(
  "rewardcategory/updaterewardcategory",
  async (args, { dispatch, getState }) => {
    return await AxiosConfig.put(`${API_PREFIX}updaterewardcategory`, args)
      .then((res) => {
        if (res.data.responseCode === responseCode.Success)
          res.data.message = "Reward Category updated successfully!";
        responseMessage({ dispatch, data: res.data });
        return res.data;
      })
      .catch((err) => {
        responseMessage({
          dispatch: dispatch,
          type: responseMessageType.ApiFailure,
        });
        return err;
      });
  }
);

export const removeRewardCategory = createAsyncThunk(
  "rewardcategory/removerewardcategory",
  async (args, { dispatch, getState }) => {
    return await AxiosConfig.delete(`${API_PREFIX}removerewardcategory?id=${args.id}`)
      .then((res) => {
        if (res.data.responseCode === responseCode.Success) {
          res.data.message = "Reward Category removed successfully!";
          dispatch(rewardCategoryDeleted(args));
        }
        responseMessage({ dispatch, data: res.data });
        return res.data;
      })
      .catch((err) => {
        responseMessage({
          dispatch: dispatch,
          type: responseMessageType.ApiFailure,
        });
        return err;
      });
  }
);
