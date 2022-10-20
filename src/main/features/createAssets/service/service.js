import {
  ResponseResultError,
  ResponseResultSuccess,
} from '../../../../utils/api/ResponseResult';
import { jsonToFormData } from '../../../../utils/base';
import Config from '../../../../utils/services/MasterConfig';

export const getAllAssetItemService = async (payload = {}) => {
  try {
    const response = await Config.post(
      `/api/InventoryItem/GetAllItem`,
      payload
    );
    return response.data;
    // return ResponseResultSuccess(response.data);
  } catch (error) {
    return ResponseResultError(error);
  }
};

export const addAssetItemService = async (payload = {}) => {
  console.log(payload, 'addAssetItemService service');
  const formData = jsonToFormData(payload);
  try {
    const response = await Config.post(`/api/InventoryItem/AddItem`, formData);
    console.log(response, 'addAssetItemService');
    return ResponseResultSuccess(response.data);
  } catch (error) {
    return ResponseResultError(error);
  }
};

export const getAssetItemDetailByIdService = async (id) => {
  try {
    const response = await Config.get(
      `/api/InventoryItem/GetItemById?id=${id}`
    );
    console.log(response, 'getAssetItemDetailByIdService');
    return ResponseResultSuccess(response.data);
  } catch (error) {
    return ResponseResultError(error);
  }
};

export const getAllAssetItemByUserIdService = async (id) => {
  try {
    const response = await Config.get(`/api/InventoryItem/GetAllItem/${id}`);
    console.log(response, 'getAllItemService');
    return ResponseResultSuccess(response.data);
  } catch (error) {
    return ResponseResultError(error);
  }
};

export const getAllAssetItemByPaging = async (payload = {}) => {
  try {
    const response = await Config.get(`/api/InventoryItem/GetAllItemPaging`, {
      params: payload,
    });
    console.log(response, 'getAllAssetItemByPaging');
    return ResponseResultSuccess(response.data);
  } catch (error) {
    return ResponseResultError(error);
  }
};
