import Config from "../../../../utils/services/MasterConfig";
import {
  ResponseResultError,
  ResponseResultSuccess,
} from "../../../../utils/api/ResponseResult";
import { createGuid } from "../../../../utils/base";
import { DEFAULT_GUID } from "../../../../utils/constants";

export const saveCreatePost = async (request) => {
  const formData = new FormData();
  for (let obj in request) {
    console.log(obj);
    if (obj === "attachments") {
      for (let item of request["attachments"]) {
        formData.append("attachments", { id: DEFAULT_GUID, file: item });
      }
    } else {
      formData.append(obj, request[obj]);
    }
  }

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
