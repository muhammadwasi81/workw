import MasterConfig from "../../../../utils/services/MasterConfig";

export const getAllSalaryHeaderService = () => {
  return MasterConfig.get(`api/salaryheader/getallsalaryheader`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addSalaryHeaderService = (args) => {
  return MasterConfig.post(`api/salaryheader/addsalaryheader`, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
