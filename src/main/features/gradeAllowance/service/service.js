import MasterConfig from "../../../../utils/services/MasterConfig";

export const getAllGreadeAllowanceService = () => {
  return MasterConfig.get(`api/allowance/getallallowance`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getGreadesService = () => {
  return MasterConfig.get(`api/Grade/GetAllGrade`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addGradeAllowanceService = (args) => {
  return MasterConfig.post(`api/Allowance/AddGradeAllowance`, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getAllGreadesAllowanceService = () => {
  return MasterConfig.get(`api/Allowance/GetAllGradeAllowance`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
