import { createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import { responseCode } from '../../../../services/enums/responseCode';
import {
  responseMessage,
  responseMessageType,
} from '../../../../services/slices/notificationSlice';
import {
  getAllAssetCategoriesService,
  addAssetCategoryService,
  updateAssetCategoryService,
} from '../service/service';

export const getAllAssetCategories = createAsyncThunk(
  'AssetCategory/getallAssetCategories',
  async (args, { dispatch, rejectWithValue }) => {
    const res = await getAllAssetCategoriesService();
    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
      return rejectWithValue(res.message);
    }
    return res.data;
  }
);

export const addAssetCategory = createAsyncThunk(
  'AssetCategory/addAssetCategory',
  async (args, { dispatch }) => {
    const res = await addAssetCategoryService(args);
    if (res.responseCode && res.responseCode === responseCode.Success) {
      message.success('Category Added successfully!');
      responseMessage({ dispatch, data: res });
    } else {
      message.error(res.message);
    }
    return res;
  }
);

export const updateAssetCategory = createAsyncThunk(
  'AssetCategory/updateAssetCategory',
  async (args, { dispatch }) => {
    const res = await updateAssetCategoryService(args);
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        message.success('Category updated successfully!');
      responseMessage({ dispatch, data: res });
      if (res.responseCode === responseCode.Error) message.error(res.message);
    } else {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }

    return res;
  }
);
