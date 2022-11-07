import { createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import { responseCode } from '../../../../services/enums/responseCode';
import {
  getAllInventoryAssetService,
  addInventoryAssetService,
  getInventoryAssetByIdService,
  getAllAssetForPagingService,
} from '../service/service';

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

export const getInventoryAssetById = createAsyncThunk(
  `InventoryAsset/GetInventoryAssetById`,
  async (id) => {
    const response = await getInventoryAssetByIdService(id);
    console.log(response.data, 'getInventoryAssetById actions');
    return response.data;
  }
);

export const addInventoryAsset = createAsyncThunk(
  `InventoryAsset/addInventoryAsset`,
  async (data, { rejectWithValue }) => {
    const res = await addInventoryAssetService(data);
    console.log(res.data.message, 'addInventoryAsset actions');
    if (res.data?.responseCode === responseCode.Success) {
      message.success('InventoryAsset Created');
      return res;
    } else {
      message.error(res.data.message);
      return rejectWithValue(res.data.message);
    }
  }
);

export const getAllAssetForPaging = createAsyncThunk(
  `InventoryAsset/GetAllAssetForPaging`,
  async (data) => {
    const response = await getAllAssetForPagingService(data);
    console.log(response.data, 'getAllAssetForPaging actions');
    if (!response.responseCode) {
      message.error('Something went wrong');
    }
    return response.data;
  }
);
