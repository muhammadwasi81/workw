import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import { addFormService } from "../services/service";

export const addForm = createAsyncThunk(
  "Form/CreateForm",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await addFormService(data);
    if (res.data?.responseCode === responseCode.Success) {
      message.success("Form Created");
      console.log("res from actions", res);
      return res;
    } else {
      message.error(res.statusText);
      return rejectWithValue(res.statusText);
    }
  }
);
