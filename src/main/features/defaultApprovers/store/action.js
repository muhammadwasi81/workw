import { createAsyncThunk } from '@reduxjs/toolkit';
import { ResponseType } from '../../../../utils/api/ResponseResult';
import { openNotification } from '../../../../utils/Shared/store/slice';
import {
  getAllDefaultApprovers,
  addDefaultApprovers,
} from '../service/service';
import { handleApproversDelete } from './slice';
import MasterConfig from '../../../../utils/services/MasterConfig';
import { responseCode } from '../../../../services/enums/responseCode';
import { message } from 'antd';
import {
  responseMessage,
  responseMessageType,
} from '../../../../services/slices/notificationSlice';

export const getAllDefaultApproversAction = createAsyncThunk(
  'defaultApprovers/getDefaultApproversAction',
  async (payload, { rejectWithValue }) => {
    const response = await getAllDefaultApprovers(payload);
    console.log(response.data, 'getAllDefaultApproversAction');
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        return response.data;
      default:
        return;
    }
  }
);

export const addDefaultApproversAction = createAsyncThunk(
  'defaultApprovers/addDefaultApproversAction',
  async (payload, { rejectWithValue, dispatch }) => {
    const response = await addDefaultApprovers(payload);
    console.log(response, 'addDefaultApproversAction');
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        dispatch(
          openNotification({
            message: 'DefaultApprovers Added Successfully!',
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

export const deleteDefaultApproversByIdAction = createAsyncThunk(
  'defaultApprovers/deleteDefaultApproversByIdAction',
  async (args, { dispatch }) => {
    return await MasterConfig.delete(
      `/api/DefaultApproval/RemoveDefaultApproval?id=${args}`
    )
      .then((res) => {
        if (res.data.responseCode === responseCode.Success) {
          message.success('Default Approvers removed successfully!');
          dispatch(handleApproversDelete(args));
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
