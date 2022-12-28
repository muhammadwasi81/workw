import { createAsyncThunk } from '@reduxjs/toolkit';
import { responseCode } from '../../../../services/enums/responseCode';
import { openNotification } from '../../../../utils/Shared/store/slice';
import {
  addProjectFeatureService,
  addProjectService,
  getAllProjectsService,
  getProjectByIdService,
  removeProjectFeatureService,
  updateProjectService,
} from '../services/service';
import { message } from 'antd';
import {
  responseMessage,
  responseMessageType,
} from '../../../../services/slices/notificationSlice';

export const getAllProjects = createAsyncThunk(
  'getAllProject',
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await getAllProjectsService(data);
    if (res.responseCode === responseCode.Success) {
      return res;
    } else {
      dispatch(
        openNotification({
          message: res.message,
          type: 'error',
          duration: 2,
        })
      );
      return rejectWithValue(res.message);
    }
  }
);

export const addProject = createAsyncThunk(
  'addProject',
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await addProjectService(data);
    if (res.responseCode === responseCode.Success) {
      dispatch(
        openNotification({
          message: 'Project Created Successfully!',
          type: 'success',
          duration: 2,
        })
      );
      return res;
    } else {
      dispatch(
        openNotification({
          message: res.message,
          type: 'error',
          duration: 2,
        })
      );
      return rejectWithValue(res.message);
    }
  }
);

export const updateProject = createAsyncThunk(
  'updateProject',
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await updateProjectService(data);
    if (res.responseCode === responseCode.Success) {
      dispatch(
        openNotification({
          message: 'Project Updated Successfully!',
          type: 'success',
          duration: 2,
        })
      );
      return res;
    } else {
      dispatch(
        openNotification({
          message: res.message,
          type: 'error',
          duration: 2,
        })
      );
      return rejectWithValue(res.message);
    }
  }
);

export const getProjectById = createAsyncThunk(
  'getProjectById',
  async (id, { dispatch, getState, rejectWithValue }) => {
    const res = await getProjectByIdService(id);
    if (res.responseCode === responseCode.Success) {
      return res;
    } else {
      dispatch(
        openNotification({
          message: res.message,
          type: 'error',
          duration: 2,
        })
      );
      return rejectWithValue(res.message);
    }
  }
);

export const removeProjectFeatureAction = createAsyncThunk(
  'removeProjectFeature',
  async (id, { dispatch }) => {
    console.log(id, 'args.id in action');
    const res = await removeProjectFeatureService(id);
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        message.success('Project Feature Removed Successfully!');
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

export const addProjectFeatureAction = createAsyncThunk(
  'addProjectFeature',
  async (id, { dispatch }) => {
    console.log(id, 'data in action');
    const res = await addProjectFeatureService(id);
    console.log(res, 'res in action');
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        message.success('Project Feature Added Successfully!');
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
