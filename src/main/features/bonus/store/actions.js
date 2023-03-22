import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  getAllBonusService,
  addBonusService,
  GetBonusByIdService,
  cancelBonusService,
} from "../services/service";
import { openNotification } from "../../../../utils/Shared/store/slice";
import { cancelBonusSuccess } from "./slice";

export const getAllBonus = createAsyncThunk(
  "Bonus/GetAllBonus",
  async (data) => {
    const response = await getAllBonusService(data);
    console.log(response.data, "jjjrrr");
    if (!response.responseCode) {
      message.error("Something went wrong");
    }
    return response.data;
  }
);

export const addBonus = createAsyncThunk(
  "Bonus/addBonus",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await addBonusService(data);
    if (res.data?.responseCode === responseCode.Success) {
      // message.success('Bonus Created');
      dispatch(
        openNotification({
          message: "Bonus Created",
          type: "success",
        })
      );
      return res;
    } else {
      message.error(res.data.message);
      return rejectWithValue(res.data.message);
    }
  }
);

export const GetBonusById = createAsyncThunk(
  "Bonus/GetBonusById'",
  async (id) => {
    const response = await GetBonusByIdService(id);
    return response.data;
  }
);

export const cancelBonus = createAsyncThunk(
  "bonus/cancelBonus",
  async (id, { dispatch, setState }) => {
    const response = await cancelBonusService(id);
    dispatch(cancelBonusSuccess({ bonusId: id }));
    return response;
  }
);
