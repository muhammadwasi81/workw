import { createAsyncThunk } from '@reduxjs/toolkit';
import { responseCode } from '../../../../../services/enums/responseCode';
import {
  responseMessage,
  responseMessageType,
} from '../../../../../services/slices/notificationSlice';
import AxiosConfig from '../../../../../utils/services/AxiosConfig';
import {
  addWarningCategoryService,
  getAllWarningCategoriesService,
} from '../services/service';
import { warningCategoryDeleted } from './slice';
import { message } from 'antd';

const API_PREFIX = 'konnectapi/api/Administration/WarningCategory/';

export const getAllWarningCategories = createAsyncThunk(
  'WarningCategory/GetAllWarningCategory',
  async (args, { dispatch }) => {
    console.log(args, 'bye');
    const res = await getAllWarningCategoriesService();
    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const addWarningCategory = createAsyncThunk(
  'WarningCategory/addWarningCategory',
  async (args, { dispatch }) => {
    const res = await addWarningCategoryService(args);
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        res.message = 'Warning Category added successfully!';
      message.success(res.message);
      responseMessage({ dispatch, data: res });
    } else {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }

    return res;
  }
);

export const updateWarningCategory = createAsyncThunk(
  'WarningCategory/updateWarningCategory',
  async (args, { dispatch }) => {
    return await AxiosConfig.put(`${API_PREFIX}updateWarningCategory`, args)
      .then((res) => {
        if (res.data.responseCode === responseCode.Success)
          res.data.message = 'Warning Category updated successfully!';
        message.success(res.data.message);
        responseMessage({ dispatch, data: res.data });
        return res.data;
      })
      .catch((err) => {
        responseMessage({
          dispatch: dispatch,
          type: responseMessageType.ApiFailure,
        });
        return err;
      });
  }
);

export const removeWarningCategory = createAsyncThunk(
  'WarningCategory/removeWarningCategory',
  async (args, { dispatch }) => {
    return await AxiosConfig.delete(
      `${API_PREFIX}removeWarningCategory?id=${args.id}`
    )
      .then((res) => {
        if (res.data.responseCode === responseCode.Success) {
          res.data.message = 'Warning Category removed successfully!';
          message.success(res.data.message);
          dispatch(warningCategoryDeleted(args));
        }
        responseMessage({ dispatch, data: res.data });
        return res.data;
      })
      .catch((err) => {
        responseMessage({
          dispatch: dispatch,
          type: responseMessageType.ApiFailure,
        });
        return err;
      });
  }
);
