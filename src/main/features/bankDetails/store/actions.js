import { createAsyncThunk } from '@reduxjs/toolkit';
import { responseCode } from '../../../../services/enums/responseCode';
import {
  responseMessage,
  responseMessageType,
} from '../../../../services/slices/notificationSlice';
import { ResponseType } from '../../../../utils/api/ResponseResult';
import { openNotification } from '../../../../utils/Shared/store/slice';
import {
  getBankDetailsByUserService,
  updateUserBankService,
  addUserBankService,
} from '../service/service';

export const getAllBankDetailByUser = createAsyncThunk(
  'bankDetail',
  async (userID, { dispatch, rejectWithValue }) => {
    const res = await getBankDetailsByUserService(userID);
    // console.log(res, 'getAllBankDetailByUser action');
    if (res.responseCode === responseCode.Success) {
      return res;
    } else {
      responseMessage({
        dispatch: dispatch,
        data: res,
        type: responseMessageType.ApiFailure,
      });
      return rejectWithValue(res.message);
    }
  }
);

export const addUserBankInfoAction = createAsyncThunk(
  'bankDetail/addUserBankInfoAction',
  async (payload, { rejectWithValue, dispatch }) => {
    const response = await addUserBankService(payload);
    // console.log(response, 'addUserWorkExperienceAction action');
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        dispatch(
          openNotification({
            message: `Bank Details Added Successfully`,
            type: 'success',
            duration: 2,
          })
        );
        return response.data;
      default:
        return;
    }
  }
);

export const updateUserBankInfoAction = createAsyncThunk(
  'bankDetail/updateUserBankInfoAction',
  async (payload, { rejectWithValue, dispatch }) => {
    const response = await updateUserBankService(payload);
    // console.log(response, 'updateUserWorkExperienceAction action');
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        dispatch(
          openNotification({
            message: `Bank Details Updated Successfully`,
            type: 'success',
          })
        );
        return response.data;
      default:
        return;
    }
  }
);
