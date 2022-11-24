import { createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import MasterConfig from '../../../../../utils/services/MasterConfig';
import { responseCode } from '../../../../../services/enums/responseCode';
import {
  responseMessage,
  responseMessageType,
} from '../../../../../services/slices/notificationSlice';
import {
  addLeaveTypeService,
  getAllLeaveTypeService,
} from '../services/service';
import { leaveTypeDeleted } from './slice';

export const getAllLeaveType = createAsyncThunk(
  'leavetype/getAllleavetype',
  async (args, { dispatch }) => {
    const res = await getAllLeaveTypeService();
    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const addLeaveType = createAsyncThunk(
  'leaves/addLeave',
  async (args, { dispatch }) => {
    const res = await addLeaveTypeService(args);
    if (res.responseCode && res.responseCode === responseCode.Success) {
      message.success('Leave Created Successfully!');
      responseMessage({ dispatch, data: res });
    } else {
      message.error(res.message);
    }
    return res;
  }
);

export const updateLeaveType = createAsyncThunk(
  'leavetype/updateleavetype',
  async (args, { dispatch, getState }) => {
    return await MasterConfig.put(`api/leavetype/updateleavetype`, args)
      .then((res) => {
        if (res.data.responseCode === responseCode.Success) {
          message.success('Leave Type updated successfully!');
          return res.data;
        }
        if (res.data.responseCode === 1006) {
          message.error('Leave Type already exist');
        }
      })
      .catch((err) => {
        message.error('Something Went Wrong!');
        return err;
      });
  }
);

export const removeLeaveType = createAsyncThunk(
  'leavetype/removeleavetype',
  async (args, { dispatch }) => {
    return await MasterConfig.delete(
      `api/leaveType/removeleavetype?id=${args.id}`
    )
      .then((res) => {
        if (res.data.responseCode === responseCode.Success) {
          dispatch(leaveTypeDeleted(args));
          message.success('Leave Type removed successfully!');
        }
        return res.data;
      })
      .catch((err) => {
        message.err(err.message);
        return err;
      });
  }
);
