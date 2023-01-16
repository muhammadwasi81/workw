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
  console.log(payload, "payload");
  try {
    const {
      data: { responseCode, data, message },
    } = await Config.put(
      `api/userWorkExperience/UpdateUserWorkExperience`,
      payload
    );
    console.log(data, "updateUserEmployeeContactService service");
    if (responseCode === 1001) return ResponseResultSuccess(data);
    return ResponseResultError(message);
  } catch (e) {
    return ResponseResultError(e);
  }
};
