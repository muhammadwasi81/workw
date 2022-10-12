import MasterConfig from "../../../../utils/services/MasterConfig";
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
