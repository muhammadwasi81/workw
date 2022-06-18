import MasterConfig from "../../../../utils/services/MasterConfig";

export const getAllDepartmentService = (data) => {
  return MasterConfig.get(`api/Department/GetAllDepartment`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addDepartmentService = (data) => {
  return MasterConfig.post(`api/Department/AddDepartment`, data)
    .then((res) => {
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const GetRewardByIdService = (id) => {
  console.log("ID FROM SERVICE", id);
  return MasterConfig.get(`api/Reward/GetRewardById?id=${id}`)
    .then((res) => {
      return res;
    })
    .catch((res) => {
      return res;
    });
};
