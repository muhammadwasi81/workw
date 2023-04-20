import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addGroupService,
  getAllGroupService,
  getGroupByIdService,
  updateGroupService,
  addGroupMemberService,
  getAllGroupMemberService,
  deleteGroupMemberService,
  addGroupFavoriteMarkService,
  addGroupFeaturesService,
  removeGroupFeaturesService,
  getGroupFeaturesService,
} from "../services/service";
import { responseCode } from "../../../../services/enums/responseCode";
import { openNotification } from "../../../../utils/Shared/store/slice";
import {
  addGroupMember,
  deleteGroupMember,
  removeGroupFeatures,
} from "../store/slice";
import { ActionType } from "../../../sharedComponents/CustomModal";
import { ROUTES } from "../../../../utils/routes";

export const getAllGroup = createAsyncThunk(
  "getAllGroup",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await getAllGroupService(data);
    if (res.responseCode === responseCode.Success) {
      return res;
    } else {
      return rejectWithValue(res.message);
    }
  }
);

export const addGroup = createAsyncThunk(
  "addGroup",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await addGroupService(data);
    if (res.responseCode === responseCode.Success) {
      dispatch(
        openNotification({
          message: "Group Created Successfully!",
          type: "success",
          duration: 2,
          actionType: ActionType.Route,
          actionData: {
            path: `${ROUTES.GROUP.DEFAULT}/${res.data.id}`,
          },
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

export const updateGroup = createAsyncThunk(
  "updateGroup",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await updateGroupService(data);
    if (res.responseCode === responseCode.Success) {
      dispatch(
        openNotification({
          message: "Group Updated Successfully!",
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

export const getGroupById = createAsyncThunk(
  "getGroupById",
  async (id, { dispatch, getState, rejectWithValue }) => {
    const res = await getGroupByIdService(id);
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

export const addGroupMemberAction = createAsyncThunk(
  "groupMember",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await addGroupMemberService(data);
    if (res.responseCode === responseCode.Success) {
      dispatch(addGroupMember(res.data));
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

export const getAllGroupMemberAction = createAsyncThunk(
  "GetgroupMember",
  async (id, { dispatch, getState, rejectWithValue }) => {
    const res = await getAllGroupMemberService(id);
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

export const deleteGroupMemberAction = createAsyncThunk(
  "deletegroupMember",
  async (data, { dispatch, getState, rejectWithValue }) => {
    const res = await deleteGroupMemberService(data);
    if (res.responseCode === responseCode.Success) {
      dispatch(deleteGroupMember(data));
      return data.memberId;
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

export const addGroupFavoriteMarkAction = createAsyncThunk(
  "addGroupFavoriteMark",
  async (data, { dispatch, rejectWithValue }) => {
    console.log(data, "addGroupFavoriteMarkAction");
    const res = await addGroupFavoriteMarkService(data);
    console.log(res, "addGroupFavoriteMarkAction");
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

export const addGroupFeatures = createAsyncThunk(
  "addGroupFeature",
  async (data, { dispatch, rejectWithValue }) => {
    const res = await addGroupFeaturesService(data);
    console.log(res, "responsee action");
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

export const removeGroupFeaturesAction = createAsyncThunk(
  "removeGroupFeature",
  async (data, { dispatch, rejectWithValue }) => {
    const res = await removeGroupFeaturesService(data);
    if (res.responseCode === responseCode.Success) {
      dispatch(removeGroupFeatures(data));
      return data;
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

export const getGroupFeatures = createAsyncThunk(
  "getGroupFeature",
  async (id, { dispatch, rejectWithValue }) => {
    const res = await getGroupFeaturesService(id);
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
