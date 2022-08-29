// import AxiosConfig from "../../../../utils/services/AxiosConfig";
import MasterConfig from "../../../../utils/services/MasterConfig";
const API_PREFIX = "api/";

export const getUserBasicInfoByIdService = (data) => {
  return MasterConfig.get(`${API_PREFIX}Employee/GetEmployeeById?id=${data}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
