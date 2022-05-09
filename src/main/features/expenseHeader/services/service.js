import AxiosConfig from "../../../../utils/services/AxiosConfig";

const API_PREFIX = "konnectapi/api/expenseheader/";
export const getAllExpenseHeaderService = () => {
  return AxiosConfig.get(`${API_PREFIX}getallexpense`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addExpenseHeaderService = (args) => {
  return AxiosConfig.post(`${API_PREFIX}addexpense`, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
