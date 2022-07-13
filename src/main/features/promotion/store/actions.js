import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import { responseMessage, responseMessageType } from "../../../../services/slices/notificationSlice";
import { getAllPromotionService, GetPromotionByIdService, addPromotionService } from "../services/service";

export const getAllPromotions = createAsyncThunk("Promotion/GetAllPromotion", async (data) => {
  const response = await getAllPromotionService(data);
  console.log(response, "ALL PROMOTIONS FROM ACTION");
  if (!response.responseCode) {
    message.error("Something went wrong");
  }
  return response.data;
});

export const addPromotion = createAsyncThunk("Promotion/addPromotion", async (args, { dispatch, setState }) => {
  const response = await addPromotionService(args);
  return response;
});

export const GetPromotionById = createAsyncThunk("Promotion/GetPromotionById'", async (id) => {
  const response = await GetPromotionByIdService(id);
  console.log("MY ID", id);
  return response.data;
});
