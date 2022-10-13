import { createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import { responseCode } from '../../../../services/enums/responseCode';
import {
  getAllRequestListItemsService,
  addRequestListItemsService,
  getRequestListItemsByIdService,
} from '../service/service';

export const getAllRequestListItems = createAsyncThunk(
  `RequestListItems/GetAllRequestListItems`,
  async (data) => {
    const response = await getAllRequestListItemsService(data);
    console.log(response.data, 'getAllRequestListItems actions');
    if (!response.responseCode) {
      message.error('Something went wrong');
    }
    return response.data;
  }
);

export const getRequestListItemsById = createAsyncThunk(
  `RequestListItems/GetRequestListItemsById`,
  async (id) => {
    const response = await getRequestListItemsByIdService(id);
    console.log(response.data, 'getRequestListItemsById actions');
    return response.data;
  }
);

export const addRequestListItems = createAsyncThunk(
  `RequestListItems/addRequestListItems`,
  async (data, { rejectWithValue }) => {
    const res = await addRequestListItemsService(data);
    console.log(res.data.message, 'addRequestListItems actions');
    if (res.data?.responseCode === responseCode.Success) {
      message.success('RequestListItems Created');
      return res;
    } else {
      message.error(res.data.message);
      return rejectWithValue(res.data.message);
    }
  }
);
