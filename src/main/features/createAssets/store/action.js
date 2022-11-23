import { createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import {
  responseMessage,
  responseMessageType,
} from '../../../../services/slices/notificationSlice';
import { ResponseType } from '../../../../utils/api/ResponseResult';
import { openNotification } from '../../../../utils/Shared/store/slice';
import {
  addInventoryAssetService,
  getAllInventoryAssetService,
} from '../../assets/service/service';
import { handleAllocOpenComposer } from '../../assets/store/slice';
import {
  getAllAssetItemService,
  addAssetItemService,
  getAssetItemDetailByIdService,
  getAllAssetItemByUserIdService,
  getAllAssetItemByPaging,
  updateAssetItemService,
} from '../service/service';
import { handleOpenDeAllocComposer, handleResetDeAllocState } from './slice';
import { message } from 'antd';

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
// TODO: CREATE TABLE
export const addAssetItem = createAsyncThunk(
  `AssetItem/addAssetItem`,
  async (payload, { dispatch }) => {
    const res = await addAssetItemService(payload);
    console.log(res, payload, 'addAssetItem action');
    if (res.type === 1) {
      dispatch(
        openNotification({
          message: 'Asset Item Created Successfully',
          type: 'success',
        })
      );
      dispatch(handleAllocOpenComposer(false));
      return isRejectedWithValue(res);
    } else {
      dispatch(
        openNotification({
          message: responseMessageType(res.responseType),
          type: responseMessageType(res.responseType),
        })
      );
      return isRejectedWithValue(res);
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

export const getAssetItemByUserId = createAsyncThunk(
  `AssetItem/getAssetItemByUserId`,
  async (id) => {
    console.log(id, 'id in action');
    const response = await getAllAssetItemByUserIdService(id);
    console.log(response.data, 'getAssetItemByUserId actions');
    return response.data;
  }
);
// TODO: DE-ALLOCATE
export const updateAssetItems = createAsyncThunk(
  `AssetItem/updateAssetItemService`,
  async (payload, { dispatch }) => {
    const response = await updateAssetItemService(payload);
    console.log(response, 'updateAssetItemService action');
    if (response.type === 1) {
      dispatch(
        openNotification({
          message: 'Asset Item Updated Successfully',
          type: 'success',
        })
      );
      dispatch(handleResetDeAllocState());
      dispatch(handleOpenDeAllocComposer(false));
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

// todo: assets say lay rha
export const getAllInventoryAsset = createAsyncThunk(
  `InventoryAsset/GetAllInventoryAsset`,
  async (data) => {
    const response = await getAllInventoryAssetService(data);
    console.log(response.data, 'getAllInventoryAsset actions');
    if (!response.responseCode) {
      message.error('Something went wrong');
    }
    return response.data;
  }
);

export const addInventoryAsset = createAsyncThunk(
  `AssetItem/addInventoryAsset`,
  async (payload, { dispatch }) => {
    try {
      const response = await addInventoryAssetService(payload);
      console.log(response.data, 'addInventoryAsset actions');
      dispatch(handleAllocOpenComposer(false));
      dispatch(
        openNotification({
          message: 'Asset Item Allocated Successfully',
          type: 'success',
        })
      );
      return response.data;
    } catch (error) {
      dispatch(
        openNotification({
          message: 'Asset Item Created Failed',
          type: 'error',
        })
      );
      return isRejectedWithValue(error);
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
