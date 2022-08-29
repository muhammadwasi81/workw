import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { responseMessage, responseMessageType } from "../../../../services/slices/notificationSlice";
import { ResponseType } from "../../../../utils/api/ResponseResult";
import { openNotification } from "../../../../utils/Shared/store/slice";
import { addVoucherService, getAllVoucherService, getLegderService, getVoucherDetailService } from "../services/service";
import { ValidateSubmitVoucher } from "../utils/validate";

export const addVoucher = createAsyncThunk(
  "Voucher/addVoucher",
  async (request, { rejectWithValue, dispatch }) => {
    let validatePayload = ValidateSubmitVoucher(request);
    if (validatePayload.error) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
        data: validatePayload
      });
      return rejectWithValue(validatePayload.message)
    }

    const response = await addVoucherService(request);
    switch (response.type) {
      case ResponseType.ERROR:
        responseMessage({
          dispatch: dispatch,
          type: responseMessageType.ApiFailure,
          data: {
            message: response.errorMessage
          }
        });
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        dispatch(openNotification({
          message: "Voucher Create Successfully",
          type: "success",
          duration: 2
        }))
        console.log(response)
        return response.data;
      default:
        return null;
    }
  }
);
export const getVoucherDetail = createAsyncThunk(
  "Voucher/voucherDetail",
  async (id, { rejectWithValue, dispatch }) => {
    const response = await getVoucherDetailService(id);
    switch (response.type) {
      case ResponseType.ERROR:
        responseMessage({
          dispatch: dispatch,
          type: responseMessageType.ApiFailure,
          data: {
            message: response.errorMessage
          }
        });
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        return response.data;
      default:
        return;
    }
  }
);

export const getAllVoucher = createAsyncThunk(
  "Voucher/getAllVoucher",
  async (data, { rejectWithValue, dispatch }) => {
    const response = await getAllVoucherService(data);
    switch (response.type) {
      case ResponseType.ERROR:
        responseMessage({
          dispatch: dispatch,
          type: responseMessageType.ApiFailure,
          data: {
            message: response.errorMessage
          }
        });
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        return response.data;
      default:
        return;
    }
  }
);

export const getLedgerReport = createAsyncThunk(
  "Voucher/getLedgerReport",
  async (data, { rejectWithValue, dispatch }) => {
    const response = await getLegderService(data);
    switch (response.type) {
      case ResponseType.ERROR:
        responseMessage({
          dispatch: dispatch,
          type: responseMessageType.ApiFailure,
          data: {
            message: response.errorMessage
          }
        });
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        return response.data;
      default:
        return;
    }
  }
);