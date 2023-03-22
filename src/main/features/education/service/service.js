import {
  ResponseResultError,
  ResponseResultSuccess,
} from "../../../../utils/api/ResponseResult";
import MasterConfig from "../../../../utils/services/MasterConfig";
import Config from "../../../../utils/services/MasterConfig";

const API_PREFIX = "api/";

export const getAllEducationService = (data) => {
  return MasterConfig.get(
    `${API_PREFIX}UserEducation/GetAllUserEducation?userId=${data}`
  )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const updateUserEducationService = async (payload) => {
  console.log(payload, "payload");
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.put(
      `${API_PREFIX}UserEducation/UpdateUserEducation`,
      payload
    );
    console.log(data, "updateUserEducationService service");
    if (responseCode === 1001) return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};

export const addUserEducationService = async (payload) => {
  console.log(payload, "payload", payload.id);
  const newPayload = {
    ...payload.payload,
    startDate: payload.payload.startDate[0],
    endDate: payload.payload.startDate[1],
    userId: payload.id,
  };

  try {
    const {
      data: { responseCode, data, message },
    } = await Config.post(
      `${API_PREFIX}UserEducation/AddUserEducation?id=${payload.id}`,
      newPayload
    );
    console.log(data, "AddUserEducationService service");
    if (responseCode === 1001) return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};
