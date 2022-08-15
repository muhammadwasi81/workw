import AxiosConfig from "../../../../utils/services/MasterConfig";

const API_PREFIX = "api/ExpenseHeader/";
export const getAllExpenseHeaderService = () => {
  return AxiosConfig.get(`${API_PREFIX}GetAllExpenseHeader`)
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
