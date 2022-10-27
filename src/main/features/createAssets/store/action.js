import { createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import { message } from 'antd';
import {
  responseMessage,
  responseMessageType,
} from '../../../../services/slices/notificationSlice';
import { ResponseType } from '../../../../utils/api/ResponseResult';
import { openNotification } from '../../../../utils/Shared/store/slice';
import {
  getAllAssetItemService,
  addAssetItemService,
  getAssetItemDetailByIdService,
  getAllAssetItemByUserIdService,
  getAllAssetItemByPaging,
  updateAssetItemService,
} from '../service/service';

export const getAllAssetItems = createAsyncThunk(
  'AssetItem/getAllAssetItem',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await getAllAssetItemService(payload);
      console.log(response, 'response in action');
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addAssetItem = createAsyncThunk(
  `AssetItem/addAssetItem`,
  async (payload, { dispatch }) => {
    const response = await addAssetItemService(payload);
    console.log(response, payload, 'addAssetItem action');
    if (response.responseType === ResponseType.SUCCESS) {
      message.success('Asset Item Added Successfully');
      return response.data;
    } else {
      dispatch(
        openNotification({
          message: responseMessage(response.responseType),
          type: responseMessageType(response.responseType),
        })
      );
      return isRejectedWithValue(response);
    }
  }
);

export const getAssetItemDetailById = createAsyncThunk(
  `AssetItem/getAssetItemDetailById`,
  async (id) => {
    try {
      const response = await getAssetItemDetailByIdService(id);
      console.log(response.data, 'getAssetItemDetailById action');
      return response.data;
    } catch (error) {
      return isRejectedWithValue(error);
    }
  }
);

// TODO: update action for asset item
export const getAllAssetItemByUserId = createAsyncThunk(
  `AssetItem/getAllAssetItemByUserId`,
  async (id, { dispatch }) => {
    const response = await getAllAssetItemByUserIdService(id);
    console.log(response, 'getAllAssetItemByUserId action');
    if (response.responseType === ResponseType.SUCCESS) {
      console.log(response, 'get single user ka response');
      return response.data;
    } else {
      dispatch(
        openNotification({
          message: responseMessage(response.responseType),
          type: responseMessageType(response.responseType),
        })
      );
      return isRejectedWithValue(response);
    }
  }
);

// TODO: update action for asset item
export const updateAssetItems = createAsyncThunk(
  `AssetItem/updateAssetItemService`,
  async (payload, { dispatch }) => {
    const response = await updateAssetItemService(payload);
    console.log(response, 'updateAssetItemService action');
    if (response.responseType === ResponseType.SUCCESS) {
      console.log('update API ka response');
      message.success('Asset Item Updated Successfully');
      return response.data;
    } else {
      dispatch(
        openNotification({
          message: responseMessage(response.responseType),
          type: responseMessageType(response.responseType),
        })
      );
      return isRejectedWithValue(response);
    }
  }
);

export const getAllAssetItemByPagination = createAsyncThunk(
  `AssetItem/getAllAssetItemByPaging`,
  async (payload, { dispatch }) => {
    const response = await getAllAssetItemByPaging(payload);
    console.log(response, 'getAllAssetItemByPaging action');
    if (response.responseType === ResponseType.SUCCESS) {
      return response.data;
    } else {
      dispatch(
        openNotification({
          message: responseMessage(response.responseType),
          type: responseMessageType(response.responseType),
        })
      );
      return isRejectedWithValue(response);
    }
  }
);
