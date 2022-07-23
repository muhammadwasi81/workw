import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import { responseMessage, responseMessageType } from "../../../../services/slices/notificationSlice";
import { getAllBonusService, addBonusService, GetBonusByIdService } from "../services/service";

export const getAllBonus = createAsyncThunk("Bonus/GetAllBonus", async (data) => {
  const response = await getAllBonusService(data);
  if (!response.responseCode) {
    message.error("Something went wrong");
  }
  return response.data;
});

export const addBonus = createAsyncThunk("Bonus/addBonus", async (args, { dispatch, setState }) => {
  const response = await addBonusService(args);
  return response;
});

export const GetBonusById = createAsyncThunk("Bonus/GetBonusById'", async (id) => {
  const response = await GetBonusByIdService(id);
  return response.data;
});
