import { createAsyncThunk } from '@reduxjs/toolkit';
import { ResponseType } from '../../../../utils/api/ResponseResult';
import { openNotification } from '../../../../utils/Shared/store/slice';
import {
  getAllDefaultApprovers,
  getDefaultApproversById,
  addDefaultApprovers,
  deleteDefaultApproversById,
} from '../service/service';

export const getAllDefaultApproversAction = createAsyncThunk(
  'defaultApprovers/getDefaultApproversAction',
  async (payload, { rejectWithValue, dispatch }) => {
    const response = await getAllDefaultApprovers(payload);
    console.log(response.data, 'getAllDefaultApproversAction');
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        dispatch(
          openNotification({
            message: 'Default Approvers fetched Successfully!',
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

export const getDefaultApproversByIdAction = createAsyncThunk(
  'defaultApprovers/getDefaultApproversByIdAction',
  async (id, { rejectWithValue, dispatch }) => {
    console.log(id, 'single member id');
    const response = await getDefaultApproversById(id);
    console.log(response.data, 'getDefaultApproversByIdAction');
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        dispatch(
          openNotification({
            message: 'Default Approvers fetched Successfully!',
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

export const addDefaultApproversAction = createAsyncThunk(
  'defaultApprovers/addDefaultApproversAction',
  async (payload, { rejectWithValue, dispatch }) => {
    const response = await addDefaultApprovers(payload);
    console.log(response.data, 'addDefaultApproversAction');
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
  async (id, { rejectWithValue, dispatch }) => {
    const response = await deleteDefaultApproversById(id);
    console.log(response.data, 'deleteDefaultApproversByIdAction');
    switch (response.type) {
      case ResponseType.ERROR:
        return rejectWithValue(response.errorMessage);
      case ResponseType.SUCCESS:
        dispatch(
          openNotification({
            message: 'DefaultApprovers Deleted Successfully!',
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
