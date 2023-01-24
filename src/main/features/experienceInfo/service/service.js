import {
  ResponseResultError,
  ResponseResultSuccess,
} from "../../../../utils/api/ResponseResult";
import MasterConfig from "../../../../utils/services/MasterConfig";
import Config from "../../../../utils/services/MasterConfig";
const API_PREFIX = "api/";

export const getUserWorkExperienceService = (data) => {
  return MasterConfig.get(
    `${API_PREFIX}UserWorkExperience/GetAllUserWorkExperience?userId=${data}`
  )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const updateUserWorkExperienceService = async (payload) => {
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.put(
      `${API_PREFIX}userWorkExperience/UpdateUserWorkExperience`,
      payload
    );
    console.log(data, "updateUserEmployeeContactService service");
    if (responseCode === 1001) return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};

export const addUserWorkExperienceService = async (payload) => {
  console.log(payload, "payload", payload.id);
  let newPayload;
  if (Array.isArray(payload.payload.startDate)) {
    newPayload = {
      ...payload.payload,
      userId: payload.id,
      startDate: payload.payload.startDate[0],
      endDate: payload.payload.startDate[1],
    };
  } else {
    newPayload = {
      ...payload.payload,
      userId: payload.id,
    };
  }

  try {
    const {
      data: { responseCode, data, message },
    } = await Config.post(
      `${API_PREFIX}UserWorkExperience/AddUserWorkExperience?userId=${payload.id}`,
      newPayload
    );
    console.log(data, "UserWorkExperience service");
    if (responseCode === 1001) return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};
