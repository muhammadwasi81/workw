import { createAsyncThunk } from '@reduxjs/toolkit';
import { responseCode } from '../../../../services/enums/responseCode';
import {
  responseMessage,
  responseMessageType,
} from '../../../../services/slices/notificationSlice';
import {
  addBusinessPolicyService,
  removeBusinessPolicyService,
  getAllBusinessPolicyService,
  updateBusinessPolicyService,
} from '../services/service';
import { businessDeleted } from './slice';
import { message } from 'antd';

export const addBusinessPolicy = createAsyncThunk(
  'addBusiness',
  async (data, { dispatch, rejectWithValue }) => {
    const res = await addBusinessPolicyService(data);
    if (res.responseCode === responseCode.Success) {
      message.success(`Business Policy Added Successfully`);
      return res;
    } else {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
      message.error(`Error: ${res.responseMessage}`);
      return rejectWithValue('Something went wrong');
    }
  }
);

export const getAllBusinessPolicy = createAsyncThunk(
  'getAllBusinessPolicy',
  async (data, { dispatch }) => {
    const res = await getAllBusinessPolicyService(data);
    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const removeBusinessPolicy = createAsyncThunk(
  'removeBusinessPolicy',
  async (args, { dispatch, rejectWithValue }) => {
    const res = await removeBusinessPolicyService(args);
    if (res.responseCode === responseCode.Success) {
      dispatch(businessDeleted(args));
      message.success(`Business Policy Deleted Successfully`);
      return res;
    } else {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
      message.error(`Error: ${res.responseMessage}`);
      return rejectWithValue('Something went wrong');
    }
  }
);

export const updateBusinessPolicy = createAsyncThunk(
  'updateBusinessPolicy',
  async (data, { dispatch, rejectWithValue }) => {
    const res = await updateBusinessPolicyService(data);
    if (res.responseCode === responseCode.Success) {
      message.success(`Business Policy Updated Successfully`);
      return res;
    } else {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
      message.error(`Error: ${res.responseMessage}`);
      return rejectWithValue('Something went wrong');
    }
  }
);
