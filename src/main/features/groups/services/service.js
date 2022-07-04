import MasterConfig from "../../../../utils/services/MasterConfig";

export const getAllProjectsService = (data) => {
  return MasterConfig.get(`api/Department/GetAllDepartment`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
