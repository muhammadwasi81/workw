import { createAsyncThunk } from '@reduxjs/toolkit';
import { responseCode } from '../../../../services/enums/responseCode';
import MasterConfig from '../../../../utils/services/MasterConfig';
import {
  responseMessage,
  responseMessageType,
} from '../../../../services/slices/notificationSlice';
import {
  addAllowanceService,
  getAllAllowanceService,
  updateAllowanceService,
} from '../services/service';
import { allowanceDeleted } from './slice';
import { message } from 'antd';

export const getAllAllowance = createAsyncThunk(
  'allowance/GetAllAllowance',
  async (args, { dispatch }) => {
    const res = await getAllAllowanceService();
    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const addAllowance = createAsyncThunk(
  'allowance/addAllowance',
  async (args, { dispatch }) => {
    const res = await addAllowanceService(args);
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success) {
        message.success('Allowance added successfully!');
      } else {
        message.error(`Error: ${res.message}`);
      }
    }
    return res;
  }
);

export const updateAllowance = createAsyncThunk(
  'allowance/updateAllowance',
  async (args, { dispatch }) => {
    const res = await updateAllowanceService(args);
    console.log(res, 'update action');
    if (res.responseCode === responseCode.Success) {
      message.success('Allowance updated successfully!');
    } else {
      message.error(`Error: ${res.message}`);
    }
    return res;
  }
);

export const removeAllowance = createAsyncThunk(
  'allowance/removeallowance',
  async (args, { dispatch }) => {
    return await MasterConfig.delete(
      `api/allowance/removeallowance?id=${args.id}`
    )
      .then((res) => {
        console.log(res, 'fdfdfd');
        if (res.data.responseCode === responseCode.Success) {
          message.success('Allowance removed successfully!');
          dispatch(allowanceDeleted(args));
        } else {
          message.error(res.message);
        }
        responseMessage({ dispatch, data: res.data });
        return res.data;
      })
      .catch((err) => {
        responseMessage({
          dispatch: dispatch,
          type: responseMessageType.ApiFailure,
        });
        message.error(`Error: ${err.message}`);
        return err;
      });
  }
);
