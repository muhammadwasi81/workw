import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../../../services/slices/notificationSlice";
import AxiosConfig from "../../../../../../utils/services/AxiosConfig";

import { getAllCareerService } from "../service/service";

export const getAllCareerAction = createAsyncThunk(
  "careerslice/ getAllCareerAction",
  async (args, { dispatch, getState }) => {
    const res = await getAllCareerService();
    console.log(res, "RESPONSE");

    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);
