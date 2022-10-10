import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../../../services/enums/responseCode";
import { ResponseType } from "../../../../../../utils/api/ResponseResult";

import {
  responseMessage,
  responseMessageType,
} from "../../../../../../services/slices/notificationSlice";
import AxiosConfig from "../../../../../../utils/services/AxiosConfig";

import { getAllCareerService } from "../service/service";

export const getAllCareerAction = createAsyncThunk(
  "careerslice/ getAllCareerAction",
  async (request, { rejectWithValue }) => {
    console.log(request, "GET REQUEST career");
    const response = await getAllCareerService({ request });
    console.log(request, "GET REQUEST career 22");

    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        return response.data;
      default:
        return;
    }
  }
);
