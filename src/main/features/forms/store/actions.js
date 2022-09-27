import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { responseCode } from "../../../../services/enums/responseCode";
import { addFormService, getAllFormsService } from "../services/service";

export const getAllForms = createAsyncThunk(
  "Form/getAllForms",
  async (data) => {
    const response = await getAllFormsService(data);

    if (!response.responseCode) {
      message.error("Something went wrong");
    }
    // console.log("response data from actions", response.data);
    return response.data;
  }
);

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
