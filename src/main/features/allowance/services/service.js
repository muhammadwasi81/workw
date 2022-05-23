import MasterConfig from "../../../../utils/services/MasterConfig";


const API_PREFIX = "konnectapi/api/allowance/";

export const getAllAllowanceService = () => {
  return MasterConfig.get(`api/allowance/getallallowance`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addAllowanceService = (args) => {
  return MasterConfig.post(`api/allowance/addallowance`, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
