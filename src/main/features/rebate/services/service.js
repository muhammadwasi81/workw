import MasterConfig from "../../../../utils/services/MasterConfig";
import { jsonToFormData } from "../../../../utils/base";

export const getAllEmployeeRebateService = (id) => {
  console.log(id, "id servve");
  return MasterConfig.get(`api/EmployeeRebate/GetAllEmployeeRebate?id=${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addEmployeeRebateService = (args) => {
  //TODO: convert payload into formData
  const formData = jsonToFormData(args);
  return MasterConfig.post(`api/EmployeeRebate/AddEmployeeRebate`, formData)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
export const updateEmployeeRebateService = (args) => {
  console.log(args, "servive payload");
  const formData = jsonToFormData(args);
  return MasterConfig.put(`api/EmployeeRebate/UpdateEmployeeRebate`, formData)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
export const removeEmployeeRebateService = (id) => {
  return MasterConfig.delete(`api/EmployeeRebate/removeEmployeeRebate?id=${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
