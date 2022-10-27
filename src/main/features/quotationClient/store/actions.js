import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import { ResponseType } from "../../../../utils/api/ResponseResult";
import { openNotification } from "../../../../utils/Shared/store/slice";
import {
  addMultipleQuotationClientService,
  getAllQuotationClientService,
  getQuotationClientByIdService,
} from "../services/service";

export const createClientQuotation = createAsyncThunk(
  "QuotationClient/createQuotationClient",
  async (data, { dispatch, rejectWithValue }) => {
    const res = await addMultipleQuotationClientService(data);
    console.log(res, "FROM CAREER RESPONSE");

    switch (res.type) {
      case ResponseType.ERROR:
        dispatch(
          openNotification({
            message: res.errorMessage,
            type: "error",
          })
        );
        return rejectWithValue(res.errorMessage);
      case ResponseType.SUCCESS:
        dispatch(
          openNotification({
            message: "Quotation Created Successfully",
            type: "success",
            duration: 2,
          })
        );
        return res.data;
      default:
        return;
    }
  }
);

export const getQuotationClientById = createAsyncThunk(
  "QuotationClient/getQuotationClientById",
  async (id, { rejectWithValue, dispatch }) => {
    const response = await getQuotationClientByIdService(id);
    switch (response.type) {
      case ResponseType.ERROR:
        responseMessage({
          dispatch: dispatch,
          type: responseMessageType.ApiFailure,
          data: {
            message: response.errorMessage,
          },
        });
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        return response.data;
      default:
        return;
    }
  }
);

export const getAllQuotationClient = createAsyncThunk(
  "QuotationClient/getAllQuotationClient",
  async (data, { rejectWithValue, dispatch }) => {
    const response = await getAllQuotationClientService(data);
    switch (response.type) {
      case ResponseType.ERROR:
        responseMessage({
          dispatch: dispatch,
          type: responseMessageType.ApiFailure,
          data: {
            message: response.errorMessage,
          },
        });
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        return response;
      default:
        return;
    }
  }
);
