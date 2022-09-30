import MasterConfig from "../../../../utils/services/MasterConfig";

export const getAllExpenseHeaderService = () => {
  return MasterConfig.get(`api/ExpenseHeader/GetAllExpenseHeader`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addExpenseHeaderService = (args) => {
  return MasterConfig.post(`api/ExpenseHeader/addexpenseHeader`, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
