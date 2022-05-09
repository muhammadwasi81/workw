import AxiosConfig from "../../../../utils/services/AxiosConfig";

const API_PREFIX = "konnectapi/api/salaryheader/";
export const getAllSalaryHeaderService = () => {
  return AxiosConfig.get(`${API_PREFIX}getallsalaryheader`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addSalaryHeaderService = (args) => {
  return AxiosConfig.post(`${API_PREFIX}addsalaryheader`, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
