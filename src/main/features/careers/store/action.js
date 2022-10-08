import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import { openNotification } from "../../../../utils/Shared/store/slice";
import { addCareerService } from "../services/service";

export const addCareer = createAsyncThunk("Career/addCareer", async (data, { dispatch, getState, rejectWithValue }) => {
  const res = await addCareerService(data);
  console.log(res.data.message, "RESPONSE")
  if (res.data?.responseCode === responseCode.Success) {
    message.success('Career Created');
    return res;
  } else {
    message.error(res.data.message);
    return rejectWithValue(res.data.message);
  }
});