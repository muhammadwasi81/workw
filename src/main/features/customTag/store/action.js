import { createAsyncThunk } from '@reduxjs/toolkit';
import { responseCode } from '../../../../services/enums/responseCode';
import {
  responseMessage,
  responseMessageType,
} from '../../../../services/slices/notificationSlice';
import {
    getAllCustomTagByIdService,
    addCustomTagService,
    updateCustomTagService,
    removeCustomTagService,

} from '../services/service';
import { message } from 'antd';

export const getAllCustomTagById = createAsyncThunk(
  'customtag/getAllCustomTagById',
  async (id, { dispatch }) => {
    const res = await getAllCustomTagByIdService(id);
    console.log(res,"responseeee");
    if (!res.responseCode) {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const addCustomTag = createAsyncThunk(
  'customtag/addCustomTag',
  async (args, { dispatch }) => {
    const res = await addCustomTagService(args);
    console.log(res,"response");
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        res.message = 'Custom Tag added successfully!';
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

export const updateCustomTag = createAsyncThunk(
  'customtag/updateCustomTag',
  async (args, { dispatch }) => {
    const res = await updateCustomTagService(args);
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        res.message = 'Grade updated successfully!';
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

export const removeCustomTag = createAsyncThunk(
  'grade/removeGrade',
  async (args, { dispatch }) => {
    const res = await removeCustomTagService(args.id);

    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        res.message = 'custom removed successfully!';
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