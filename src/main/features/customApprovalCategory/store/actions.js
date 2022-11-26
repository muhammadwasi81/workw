import { createAsyncThunk } from '@reduxjs/toolkit';
import { responseCode } from '../../../../services/enums/responseCode';
import {
  responseMessage,
  responseMessageType,
} from '../../../../services/slices/notificationSlice';
import {
  addCustomApprovalCategoryService,
  getAllCustomApprovalCategoryService,
} from '../services/service';
import { customApprovalCategoryDeleted } from './slice';
import MasterConfig from '../../../../utils/services/MasterConfig';
import { message } from 'antd';

export const getAllCustomApprovalCategory = createAsyncThunk(
  'CustomApprovalCategory/getAllCustomApprovalCategory',
  async (args, { dispatch }) => {
    const res = await getAllCustomApprovalCategoryService();

    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res.data;
  }
);

export const addCustomApprovalCategory = createAsyncThunk(
  'CustomApprovalCategory/addCustomApprovalCategory',
  async (args, { dispatch }) => {
    const res = await addCustomApprovalCategoryService(args);

    if (res.responseCode) {
      if (res.responseCode === responseCode.Success) {
        message.success('Custom Approval Category added successfully!');
        return res;
      } else {
        message.error(res.message);
      }
    } else {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }

    return res;
  }
);

export const updateCustomApprovalCategory = createAsyncThunk(
  'CustomApprovalCategory/updateCustomApprovalCategory',
  async (args, { dispatch }) => {
    return await MasterConfig.put(
      `api/CustomApprovalCategory/updateCustomApprovalCategory`,
      args
    )
      .then((res) => {
        if (res.data.responseCode === responseCode.Success)
          res.data.message = 'Custom Approval Category updated successfully!';
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

export const removeCustomApprovalCategory = createAsyncThunk(
  'CustomApprovalCategory/removeCustomApprovalCategory',
  async (args, { dispatch }) => {
    return await MasterConfig.delete(
      `api/CustomApprovalCategory/removeCustomApprovalCategory?id=${args.id}`
    )
      .then((res) => {
        if (res.data.responseCode === responseCode.Success) {
          res.data.message = 'Custom Approval Category removed successfully!';
          message.success(res.data.message);
          dispatch(customApprovalCategoryDeleted(args));
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
