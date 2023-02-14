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
  getAllProjectStickyService,
  getAllProjectMemberService,
  addProjectMemberService,
  deleteProjectMemberService,
  addProjectFavoriteService,
  saveStickyNoteProject
} from '../services/service';
import { message } from 'antd';
import {
  responseMessage,
  responseMessageType,
} from '../../../../services/slices/notificationSlice';
import { jsonToFormData, STRINGS } from '../../../../utils/base';
import { deleteProjectMember, addProjectMember } from '../store/slice';

const addSticky_SD = (data) => {
  return {
    // id: data.id ? data.id : 1,
    title: data.title ? data.title : '',
    description: data.description ? data.description : '',
    privacyId: data.privacyId ? data.privacyId : 1,
    colorCode: data.colorCode ? data.colorCode : '',
    attachments: data.attachments ? data.attachments : [],
  };
};
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



export const saveStickyprojectAction = createAsyncThunk(
  'saveProjectTitle',
  async (data, { dispatch }) => {
    const formdataRequest = jsonToFormData(data);
    const res = await saveStickyNoteProject(formdataRequest);
    console.log(res,"responseeeee");
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        message.success('save title notes');
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

export const getProjectStickyAction = createAsyncThunk(
  'getSticky',
  async (data, { dispatch }) => {
    const res = await getAllProjectStickyService(data);
    console.log("response",res);
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        message.success('save title notes');
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

export const getAllProjectMemberAction = createAsyncThunk(
  'getMember',
  async (id, { dispatch }) => {
    const res = await getAllProjectMemberService(id);
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

export const addProjectMemberAction = createAsyncThunk(
  'addMember',
  async (data, { dispatch }) => {
    const res = await addProjectMemberService(data);
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        dispatch(addProjectMember(res.data));
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

export const deleteProjectMemberAction = createAsyncThunk(
  'deleteMember',
  async (data, { dispatch }) => {
    const res = await deleteProjectMemberService(data);
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        dispatch(deleteProjectMember(data));
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

export const addProjectFavoriteAction = createAsyncThunk(
  'addFavorite',
  async (data, { dispatch }) => {
    console.log(data, 'data in action');
    const res = await addProjectFavoriteService(data);
    console.log(res, 'res in action');
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
