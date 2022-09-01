// import AxiosConfig from "../../../../utils/services/AxiosConfig";
import MasterConfig from "../../../../utils/services/MasterConfig";
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
