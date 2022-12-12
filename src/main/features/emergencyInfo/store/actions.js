import { createAsyncThunk } from '@reduxjs/toolkit';
import { responseCode } from '../../../../services/enums/responseCode';
import {
  responseMessage,
  responseMessageType,
} from '../../../../services/slices/notificationSlice';
import {
  getUserEmergencyService,
  updateUserEmployeeContactService,
} from '../service/service';

export const getUserEmergency = createAsyncThunk(
  'emergencyDetails',
  async (id, { dispatch, rejectWithValue }) => {
    const res = await getUserEmergencyService(id);
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

// TODO: UPDATE USER EMERGENCY CONTACT ACTION
export const updateUserEmergencyContactAction = createAsyncThunk(
  'updateUserEmergencyContact',
  async (data, { dispatch, rejectWithValue }) => {
    const res = await updateUserEmployeeContactService(data);
    console.log(res, 'updateUserEmergencyContactAction');
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
