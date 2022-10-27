import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import { ResponseType } from "../../../../utils/api/ResponseResult";
import { openNotification } from "../../../../utils/Shared/store/slice";
import {
  addMultipleQuotationClientService,
  getAllQuotationService,
  getQuotationByIdService,
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

export const getQuotationById = createAsyncThunk(
  "EmployeeSalary/getEmployeeSalaryDetail",
  async (id, { rejectWithValue, dispatch }) => {
    const response = await getQuotationByIdService(id);
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

export const getAllQuotation = createAsyncThunk(
  "Quotation/getAllQuotation",
  async (data, { rejectWithValue, dispatch }) => {
    const response = await getAllQuotationService(data);
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
