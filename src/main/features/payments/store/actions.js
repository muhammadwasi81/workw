import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import { getAllPaymentService } from "../services/service";

export const getAllPayment = createAsyncThunk(
  "Payment/getAllPayment",
  async (args, { dispatch, getState }) => {
    //TODO: will be set accordingly
    const res = await getAllPaymentService(args);

    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);
