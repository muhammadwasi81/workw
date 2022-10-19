import {
  ResponseResultError,
  ResponseResultSuccess,
} from '../../../../utils/api/ResponseResult';
import { jsonToFormData } from '../../../../utils/base';
import Config from '../../../../utils/services/MasterConfig';

export const getAllAssetItemService = async (payload = {}) => {
  try {
    const response = await Config.get(`/api/Item/GetAllItem`, {
      params: payload,
    });
    console.log(response, 'getAllAssetItemService');
    return ResponseResultSuccess(response.data);
  } catch (error) {
    return ResponseResultError(error);
  }
};

export const addAssetItemService = async (payload = {}) => {
  console.log(payload, 'service payload');
  const formData = jsonToFormData(payload);
  try {
    const response = await Config.post(`/api/Item/AddItem`, formData);
    console.log(response, 'addAssetItemService');
    return ResponseResultSuccess(response.data);
  } catch (error) {
    return ResponseResultError(error);
  }
};

export const getAssetItemDetailByIdService = async (id) => {
  try {
    const response = await Config.get(`/api/Item/GetItemById/${id}`);
    console.log(response, 'getAssetItemDetailByIdService');
    return ResponseResultSuccess(response.data);
  } catch (error) {
    return ResponseResultError(error);
  }
};

export const getAllAssetItemByUserIdService = async (id) => {
  try {
    const response = await Config.get(`/api/Item/GetAllItemByUserId/${id}`);
    console.log(response, 'getAllAssetItemByUserIdService');
    return ResponseResultSuccess(response.data);
  } catch (error) {
    return ResponseResultError(error);
  }
};

export const getAllAssetItemByPaging = async (payload = {}) => {
  try {
    const response = await Config.get(`/api/Item/GetAllItemPaging`, {
      params: payload,
    });
    console.log(response, 'getAllAssetItemByPaging');
    return ResponseResultSuccess(response.data);
  } catch (error) {
    return ResponseResultError(error);
  }
};
