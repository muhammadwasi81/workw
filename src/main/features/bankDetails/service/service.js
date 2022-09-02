// import AxiosConfig from "../../../../utils/services/AxiosConfig";
import MasterConfig from "../../../../utils/services/MasterConfig";
const API_PREFIX = "api/";

export const getBankDetailsByUserService = (data) => {
  return MasterConfig.get(
    `${API_PREFIX}UserBankDetail/GetAllUserBankDetail?userId=${data}`
  )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
