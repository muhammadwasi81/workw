import Config from "../../../../utils/services/MasterConfig";
import {
  ResponseResultError,
  ResponseResultSuccess,
} from "../../../../utils/api/ResponseResult";

export const saveCreatePost = async (request) => {
  const formData = new FormData();
  for (let obj in request) {
    formData.append(obj, request[obj]);
  }
  console.log(request);
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.post(`api/Feed/AddFeed`, formData);
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
