import AxiosConfig from "../../../../utils/services/AxiosConfig";


const API_PREFIX = "konnectapi/api/allowance/";

export const getAllAllowanceService = () => {
  return AxiosConfig.get(`${API_PREFIX}getallallowance`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addAllowanceService = (args) => {
  return AxiosConfig.post(`${API_PREFIX}addallowance`, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
