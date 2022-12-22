import { createAsyncThunk } from '@reduxjs/toolkit';
import { responseCode } from '../../../../services/enums/responseCode';
import {
  responseMessage,
  responseMessageType,
} from '../../../../services/slices/notificationSlice';
import { ResponseType } from '../../../../utils/api/ResponseResult';
import { openNotification } from '../../../../utils/Shared/store/slice';
import {
  getAllEducationService,
  updateUserEducationService,
} from '../service/service';

export const getEducationDetailByUser = createAsyncThunk(
  'educationDetails',
  async (id, { dispatch, rejectWithValue }) => {
    const res = await getAllEducationService(id);
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

export const updateUserEducationAction = createAsyncThunk(
  'educationDetails/updateUserEducation',
  async (payload, { rejectWithValue, dispatch }) => {
    const response = await updateUserEducationService(payload);
    console.log(response, 'updateUserWorkExperienceAction action');
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        dispatch(
          openNotification({
            message: `Education Updated Successfully`,
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
