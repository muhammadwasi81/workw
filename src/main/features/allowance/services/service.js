import MasterConfig from "../../../../utils/services/MasterConfig";

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
  return MasterConfig.post(`api/Allowance/AddAllowance`, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const updateAllowanceService = (payload) => {
  return MasterConfig.put(`api/allowance/updateAllowance`, payload)
    .then((res) => {
      console.log(res, "update ki call");
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
