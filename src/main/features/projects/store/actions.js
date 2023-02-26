import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseCode } from "../../../../services/enums/responseCode";
import { openNotification } from "../../../../utils/Shared/store/slice";
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
  getProjectFeatureService,
  saveStickyNoteProject
} from "../services/service";
import { message } from "antd";
import {
  responseMessage,
  responseMessageType,
} from "../../../../services/slices/notificationSlice";
import { jsonToFormData, STRINGS } from "../../../../utils/base";
import {
  deleteProjectMember,
  addProjectMember,
  deleteProjectFeature,
} from "../store/slice";

const addSticky_SD = (data) => {
  return {
    // id: data.id ? data.id : 1,
    title: data.title ? data.title : "",
    description: data.description ? data.description : "",
    privacyId: data.privacyId ? data.privacyId : 1,
    colorCode: data.colorCode ? data.colorCode : "",
    attachments: data.attachments ? data.attachments : [],
  };
};
export const getAllProjects = createAsyncThunk(
  "getAllProject",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await getAllProjectsService(data);
    if (res.responseCode === responseCode.Success) {
      return res;
    } else {
      dispatch(
        openNotification({
          message: res.message,
          type: "error",
          duration: 2,
        })
      );
      return rejectWithValue(res.message);
    }
  }
);

export const addProject = createAsyncThunk(
  "addProject",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await addProjectService(data);
    if (res.responseCode === responseCode.Success) {
      dispatch(
        openNotification({
          message: "Project Created Successfully!",
          type: "success",
          duration: 2,
        })
      );
      return res;
    } else {
      dispatch(
        openNotification({
          message: res.message,
          type: "error",
          duration: 2,
        })
      );
      return rejectWithValue(res.message);
    }
  }
);

export const updateProject = createAsyncThunk(
  "updateProject",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await updateProjectService(data);
    if (res.responseCode === responseCode.Success) {
      dispatch(
        openNotification({
          message: "Project Updated Successfully!",
          type: "success",
          duration: 2,
        })
      );
      return res;
    } else {
      dispatch(
        openNotification({
          message: res.message,
          type: "error",
          duration: 2,
        })
      );
      return rejectWithValue(res.message);
    }
  }
);

export const getProjectById = createAsyncThunk(
  "getProjectById",
  async (id, { dispatch, getState, rejectWithValue }) => {
    const res = await getProjectByIdService(id);
    if (res.responseCode === responseCode.Success) {
      return res;
    } else {
      dispatch(
        openNotification({
          message: res.message,
          type: "error",
          duration: 2,
        })
      );
      return rejectWithValue(res.message);
    }
  }
);

export const removeProjectFeature = createAsyncThunk(
  "removeProjectFeature",
  async (data, { dispatch }) => {
    const res = await removeProjectFeatureService(data);
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        // responseMessage({ dispatch, data: res });
        dispatch(deleteProjectFeature(data));
      return data;
    } else {
      responseMessage({
        dispatch: dispatch,
        type: responseMessageType.ApiFailure,
      });
    }
    return res;
  }
);

export const addProjectFeature = createAsyncThunk(
  "addProjectFeature",
  async (id, { dispatch }) => {
    const res = await addProjectFeatureService(id);
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



export const saveStickyprojectAction = createAsyncThunk(
  'saveProjectTitle',
  async (data, { dispatch }) => {
    const formdataRequest = jsonToFormData(data);
    const res = await saveStickyNoteProject(formdataRequest);
    console.log(res,"responseeeee");
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        message.success("save title notes");
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
  "getSticky",
  async (data, { dispatch }) => {
    const res = await getAllProjectStickyService(data);
    console.log("response",res);
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        message.success("save title notes");
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
  "getMember",
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
  "addMember",
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
  "deleteMember",
  async (data, { dispatch }) => {
    const res = await deleteProjectMemberService(data);
    if (res.responseCode) {
      if (res.responseCode === responseCode.Success)
        dispatch(deleteProjectMember(data));
      return data.memberId;
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
  "addFavorite",
  async (data, { dispatch }) => {
    const res = await addProjectFavoriteService(data);
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

export const getProjectFeature = createAsyncThunk(
  "getProjectFeature",
  async (id, { dispatch }) => {
    const res = await getProjectFeatureService(id);
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
