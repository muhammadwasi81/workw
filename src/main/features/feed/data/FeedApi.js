import Config from '../../../../utils/services/MasterConfig';
import {
  ResponseResultError,
  ResponseResultSuccess,
} from '../../../../utils/api/ResponseResult';
import { jsonToFormData } from '../../../../utils/base';

export const saveCreatePost = async (request) => {
  const responseData = jsonToFormData(request);
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.post(`api/Feed/AddFeed`, responseData);
    if (responseCode === 1001) return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};
export const getAllFeedServices = async (request) => {
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.post(`api/Feed/GetAllFeed`, request);
    if (responseCode === 1001) return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};
export const getFeedByIdServices = async (request) => {
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.get(`api/Feed/GetFeedById?id=${request}`);
    if (responseCode === 1001) return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};

export const feedReaction = async (request) => {
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.post(`api/Reaction/AddReaction`, request);
    if (responseCode === 1001) return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};

export const getAllReaction = async ({ id, module }) => {
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.get(
      `api/Reaction/GetAllReaction?id=${id}&module=${module}`
    );
    console.log(data, 'res data in service');
    if (responseCode === 1001) return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    // console.log(e.message, 'error in email service');
    return ResponseResultError(e);
  }
};

export const feedFavorite = async (request) => {
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.get(
      `api/Feed/AddFeedFavoriteMark?feedId=${request.id}&isPinned=${request.isPinned}`,
      request
    );
    if (responseCode === 1001) return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};

export const savePollResponseService = async (request) => {
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.post(`api/Feed/AddPollResponse?id=${request}`);
    if (responseCode === 1001) return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};
