import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import {
  getAllPromotionService,
  GetPromotionByIdService,
  addPromotionService,
  cancelPromotionService,
} from "../services/service";
import { cancelPromotionSuccess } from "./slice";

export const getAllPromotions = createAsyncThunk(
  "Promotion/GetAllPromotion",
  async (data) => {
    const response = await getAllPromotionService(data);
    if (!response.responseCode) {
      message.error("Something went wrong");
    }
    return response.data;
  }
);

export const addPromotion = createAsyncThunk(
  "Promotion/addPromotion",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await addPromotionService(data);
    if (res.data?.responseCode === responseCode.Success) {
      message.success("Promotion Created");
      return res;
    } else {
      message.error(res.data.message);
      return rejectWithValue(res.data.message);
    }
  }
);

export const GetPromotionById = createAsyncThunk(
  "Promotion/GetPromotionById",
  async (id) => {
    const response = await GetPromotionByIdService(id);
    return response.data;
  }
);

export const cancelPromotion = createAsyncThunk(
  "promotions/cancelPromotion",
  async (id, { dispatch }) => {
    const response = await cancelPromotionService(id);
    dispatch(cancelPromotionSuccess({ promotionId: id }));
    return response;
  }
);
