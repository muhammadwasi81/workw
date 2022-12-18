import { createAsyncThunk } from '@reduxjs/toolkit';
import { responseCode } from '../../../../services/enums/responseCode';
import {
  responseMessage,
  responseMessageType,
} from '../../../../services/slices/notificationSlice';
import { ResponseType } from '../../../../utils/api/ResponseResult';
import { openNotification } from '../../../../utils/Shared/store/slice';

import {
  getUserWorkExperienceService,
  updateUserWorkExperienceService,
} from '../service/service';

export const getUserWorkExperience = createAsyncThunk(
  'experienceDetails',
  async (id, { dispatch, rejectWithValue }) => {
    const res = await getUserWorkExperienceService(id);
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

export const updateUserWorkExperienceAction = createAsyncThunk(
  'experienceDetails/updateUserWorkExperience',
  async (payload, { rejectWithValue, dispatch }) => {
    const response = await updateUserWorkExperienceService(payload);
    console.log(response, 'updateUserWorkExperienceAction action');
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        dispatch(
          openNotification({
            message: 'Work Experience Updated Successfully',
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
