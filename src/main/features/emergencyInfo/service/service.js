import {
  ResponseResultError,
  ResponseResultSuccess,
} from "../../../../utils/api/ResponseResult";
import Config from "../../../../utils/services/MasterConfig";
import MasterConfig from "../../../../utils/services/MasterConfig";

const API_PREFIX = `api/`;

export const getUserEmergencyService = (data) => {
  return MasterConfig.get(
    `${API_PREFIX}UserEmergencyContact/GetAllUserEmergencyContact?userId=${data}`
  )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const updateUserEmployeeContactService = async (payload) => {
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.put(
      `${API_PREFIX}userEmergencyContact/UpdateUserEmergencyContact`,
      payload
    );
    if (responseCode === 1001) return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};

export const addUserEmergenctContactService = async (payload) => {
  const newPayload = {
    ...payload.payload,
    userId: payload.id,
  };
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.post(
      `${API_PREFIX}UserEmergencyContact/AddUserEmergencyContact?userId=${payload.id}`,
      newPayload
    );
    console.log(data, "AddUserEmergencyContact service");
    if (responseCode === 1001) return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};
