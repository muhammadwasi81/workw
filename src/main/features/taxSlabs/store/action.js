import { createAsyncThunk } from '@reduxjs/toolkit';
import { responseCode } from '../../../../services/enums/responseCode';
import {
  responseMessage,
  responseMessageType,
} from '../../../../services/slices/notificationSlice';
import {
  removeBusinessPolicyService,
  getAllBusinessPolicyService,
  updateBusinessPolicyService,
  addTaxSlabGroupService,
  getAllTaxSlabGroupService,
} from '../services/service';
import { businessDeleted } from './slice';
import { message } from 'antd';

export const addTaxSlabGroup = createAsyncThunk(
  'AddTaxSlabGroup',
  async (data, { dispatch, rejectWithValue }) => {
    const res = await addTaxSlabGroupService(data);
    if (res.responseCode === responseCode.Success) {
      message.success(`Tax Slab Group Added Successfully`);
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

export const GetAllTaxSlabGroup = createAsyncThunk(
  "TaxSlabGroup/GetAllTaxSlabGroup",
  async (data) => {
    const response = await getAllTaxSlabGroupService(data);
    if (!response.responseCode) {
      message.error("Something went wrong");
    }
    return response.data;
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
