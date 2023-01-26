// import AxiosConfig from "../../../../utils/services/AxiosConfig";
import MasterConfig from "../../../../utils/services/MasterConfig";
const API_PREFIX = "api/";

export const getUserDeviceInfoService = (payload) => {
  return MasterConfig.post(`api/Device/GetAllDevice`,[payload])
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
