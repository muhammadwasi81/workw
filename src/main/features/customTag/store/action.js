import { createAsyncThunk } from '@reduxjs/toolkit';
import { responseCode } from '../../../../services/enums/responseCode';
import {
  responseMessage,
  responseMessageType,
} from '../../../../services/slices/notificationSlice';
import { ResponseType } from "../../../../utils/api/ResponseResult";
import {
    getAllCustomTagByIdService,
    addCustomTagService,
    updateCustomTagService,
    removeCustomTagService,
    addCustomTagMemberService,
    getAllCustomTagMemberService,
    getAllCustomTagService,
} from '../services/service';
import {addCustomMember} from "./slice";
import { message } from 'antd';
export const getAllCustomTagById = createAsyncThunk(
  'customtag/getAllCustomTagById',
  async (id, { dispatch }) => {
    const res = await getAllCustomTagMemberService(id);
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
export const getAllCustomTag = createAsyncThunk(
  "customtag/getAllCustomTag",
  async (data) => {
    console.log(data);
    const response = await getAllCustomTagService(data);
    if (!response.responseCode) {
      message.error("Something went wrong");
    }
    return response.data;
  }
);
export const getAllCustomTagMember = createAsyncThunk(
  "getMember",
  async (id, { dispatch }) => {
    const res = await getAllCustomTagMemberService(id);
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
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
export const addCustomTag = createAsyncThunk(
  'customtag/addCustomTag',
  async (args, { dispatch }) => {
    const res = await addCustomTagService(args);
    console.log(res ,"actionData");
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
export const addCustomTagMember = createAsyncThunk(
  "addMember",
  async (data, { dispatch }) => {
    const res = await addCustomTagMemberService(data);
    console.log(res,"responseeeee");
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        dispatch(addCustomMember(res.data));
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
  'customtag/removeCustomTag',
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