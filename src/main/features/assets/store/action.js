import { createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import { message } from 'antd';
import { openNotification } from '../../../../utils/Shared/store/slice';
import {
  handleAllocOpenComposer,
  handleOpenDeAllocComposer,
} from '../../createAssets/store/slice';
import {
  getAllInventoryAssetService,
  addInventoryAssetService,
  getInventoryAssetByIdService,
  getAllAssetForPagingService,
} from '../service/service';
import { responseMessageType } from './../../../../services/slices/notificationSlice';

// TODO: Use this in assets slice method
// export const getAllInventoryAsset = createAsyncThunk(
//   `InventoryAsset/GetAllInventoryAsset`,
//   async (data) => {
//     const response = await getAllInventoryAssetService(data);
//     console.log(response.data, 'getAllInventoryAsset actions');
//     if (!response.responseCode) {
//       message.error('Something went wrong');
//     }
//     return response.data;
//   }
// );

export const getInventoryAssetById = createAsyncThunk(
  `InventoryAsset/GetInventoryAssetById`,
  async (id) => {
    const response = await getInventoryAssetByIdService(id);
    console.log(response.data, 'getInventoryAssetById actions');
    return response.data;
  }
);

// TODO: Use this in assets slice method

// export const addInventoryAsset = createAsyncThunk(
//   `InventoryAsset/addInventoryAsset`,
//   async (data, { dispatch }) => {
//     const res = await addInventoryAssetService(data);
//     console.log(res.data, 'addInventoryAsset actions');
//     if (res.type === 1) {
//       console.log('chalo dada ');
//       dispatch(
//         openNotification({
//           message: 'Asset Item Created Successfully',
//           type: 'success',
//         })
//       );
//       dispatch(handleAllocOpenComposer(false));
//       return res;
//     } else {
//       dispatch(
//         openNotification({
//           message: responseMessageType(res.responseType),
//           type: responseMessageType(res.responseType),
//         })
//       );
//       return isRejectedWithValue(res);
//     }
//   }
// );

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
