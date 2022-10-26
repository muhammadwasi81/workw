import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import { ResponseType } from "../../../../utils/api/ResponseResult";
import { openNotification } from "../../../../utils/Shared/store/slice";
import {
  addMultipleQuotationService,
  getAllQuotationService,
  getQuotationByIdService,
} from "../services/service";
import { ValidateAddMultipleSalary } from "../utils/validate";

export const createQuotation = createAsyncThunk(
  "Quotation/createQuotation",
  async (data, { dispatch, rejectWithValue }) => {
    const res = await addMultipleQuotationService(data);
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

export const getEmployeeSalaryDetail = createAsyncThunk(
  "EmployeeSalary/getEmployeeSalaryDetail",
  async (id, { rejectWithValue, dispatch }) => {
    const response = await getEmployeeSalaryDetailService(id);
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
