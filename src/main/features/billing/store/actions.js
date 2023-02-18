import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import { getAllBillingService } from "../services/service";

export const getAllBilling = createAsyncThunk(
  "Billing/getAllBilling",
  async (args, { dispatch, getState }) => {
    //TODO: will be set accordingly
    const res = await getAllBillingService();

    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);
