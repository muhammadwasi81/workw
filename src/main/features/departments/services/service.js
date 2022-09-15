import MasterConfig from "../../../../utils/services/MasterConfig";
import { jsonToFormData } from "../../../../utils/base";

export const getAllDepartmentService = (data) => {
  return MasterConfig.get(`api/Department/GetAllDepartment`, data)
    .then((res) => {
      console.log("response data from service", res.data);
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addDepartmentService = (data) => {
  const formData = jsonToFormData(data);
  // console.log("formdatatoFormdata", formData);
  return MasterConfig.post(`api/Department/AddDepartment`, formData)
    .then((res) => {
      console.log(res, "response from dept service");
      return res;
    })
    .catch((res) => {
      return res;
    });
};

// export const GetRewardByIdService = (id) => {
//   console.log("ID FROM SERVICE", id);
//   return MasterConfig.get(`api/Reward/GetRewardById?id=${id}`)
//     .then((res) => {
//       return res;
//     })
//     .catch((res) => {
//       return res;
//     });
// };
