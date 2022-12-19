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
} from '../service/service';

export const getBankDetailByUser = createAsyncThunk(
  'bankDetail',
  async (id, { dispatch, getState, rejectWithValue }) => {
    const res = await getBankDetailsByUserService(id);
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

export const updateUserBankInfoAction = createAsyncThunk(
  'bankDetail/updateUserBankInfoAction',
  async (payload, { rejectWithValue, dispatch }) => {
    const response = await updateUserBankService(payload);
    console.log(response, 'updateUserWorkExperienceAction action');
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        dispatch(
          openNotification({
            message: `Bank Details Updated Successfully`,
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
