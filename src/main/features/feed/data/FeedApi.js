import Config from "../../../../utils/services/MasterConfig";
import {
  ResponseResultError,
  ResponseResultSuccess,
} from "../../../../utils/api/ResponseResult";
function buildFormData(formData, data, parentKey) {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else {
    const value = data == null ? "" : data;
    formData.append(parentKey, value);
  }
}

function jsonToFormData(data) {
  const formData = new FormData();
  buildFormData(formData, data);
  return formData;
}
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
