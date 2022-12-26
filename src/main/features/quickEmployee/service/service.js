import MasterConfig from "../../../../utils/services/MasterConfig";

export const addQuickEmployeeService = (args) => {
  return MasterConfig.post(`api/employee/addQuickEmployee`, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
