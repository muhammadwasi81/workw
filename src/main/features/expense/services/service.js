import { jsonToFormData } from "../../../../utils/base";
import AxiosConfig from "../../../../utils/services/AxiosConfig";

const API_PREFIX = "api/Expense/";

export const addExpenseService = (request) => {
  const formData = jsonToFormData(request);
  return AxiosConfig.post(`${API_PREFIX}AddExpense`, formData)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
export const getAllExpenseService = (request) => {
  return AxiosConfig.post(`${API_PREFIX}GetAllExpense`, request)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
export const getExpenseByIDService = (request) => {
  return AxiosConfig.get(`${API_PREFIX}GetExpenseById?id=${request}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
