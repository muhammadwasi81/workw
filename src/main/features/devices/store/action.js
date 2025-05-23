import { createAsyncThunk } from '@reduxjs/toolkit';
import { responseCode } from '../../../../services/enums/responseCode';
import {
  responseMessage,
  responseMessageType,
} from '../../../../services/slices/notificationSlice';
import { getUserDeviceInfoService } from '../service/service';

export const getUserDeviceInfoAction = createAsyncThunk(
  'deviceInfo',
  async (payload, { dispatch, rejectWithValue }) => {
    const res = await getUserDeviceInfoService(payload);
    console.log(res, 'getUserDeviceInfo action');
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
