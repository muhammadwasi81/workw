import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import { addBillingService, getAllBillingService, getAllPendingBillsService } from "../services/service";

export const getAllBilling = createAsyncThunk(
  "Billing/getAllBilling",
  async (args, { dispatch, getState }) => {
    console.log(args);
    //TODO: will be set accordingly
    const res = await getAllBillingService(args);

    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const getAllPendingBills = createAsyncThunk(
  "Billing/getAllpendingBills",
  async (args, { dispatch, getState }) => {
    console.log(args);
    //TODO: will be set accordingly
    const res = await getAllPendingBillsService(args);

    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const addBilling = createAsyncThunk(
  "Billing/addBiling",
  async (args, { dispatch, getState }) => {
    console.log(args);
    //TODO: will be set accordingly
    const res = await addBillingService(args);

    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);
