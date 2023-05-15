import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import { ResponseType } from "../../../../utils/api/ResponseResult";
import { openNotification } from "../../../../utils/Shared/store/slice";
import { jsonToFormData } from "../../../../utils/base";

import {
  addMultipleQuotationService,
  getAllQuotationService,
  getQuotationByIdService,
} from "../services/service";

// const addQuotation = (data) => {
//   return {
//     id: data.id ? data.id : "",
//     name: data.name ? data.name : "",
//     email: data.email ? data.email : "",
//     phoneNumber: data.phoneNumber ? data.phoneNumber : "",
//     quotationDate: data.quotationDate ? data.quotationDate : "",
//     approvers: data.approvers ? data.approvers : [],
//     details: data.details ? data.details : [],
//     attachments: data.attachments ? data.attachments : [],
//   };
// };
export const createQuotation = createAsyncThunk(
  "Quotation/createQuotation",
  async (data, { dispatch, rejectWithValue }) => {
    // const formdataRequest = jsonToFormData(data);
    const res = await addMultipleQuotationService(data);
    console.log(res, "FROM QUOTATION RESPONSE");

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
  "Quotation/getQuotationById",
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
