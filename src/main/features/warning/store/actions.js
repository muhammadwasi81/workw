import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import { addComplainService, getAllComplainService, GetRewardByIdService } from "../services/service";

export const getAllComplains = createAsyncThunk(
	"Complain/GetAllComplain",
	async data => {
		const response = await getAllComplainService(data);
    if (!response.responseCode) {
        message.error("Something went wrong")
    }
		return response.data;
	}
);

export const addComplain = createAsyncThunk(
  "Complain/addComplain",
  async (args, {dispatch, setState}) => {
    const response = await addComplainService(args);
    return response
  }
)


export const GetRewardById = createAsyncThunk(
	"Reward/GetRewardById",
	async id => {
		const response = await GetRewardByIdService(id);
    console.log("MY ID", id)
		return response.data;
	}
);
