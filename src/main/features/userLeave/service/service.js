// import AxiosConfig from "../../../../utils/services/AxiosConfig";
import MasterConfig from "../../../../utils/services/MasterConfig";
import { jsonToFormData } from "../../../../utils/base";

const API_PREFIX = "/api/";

export const getUserBasicInfoByIdService = (data) => {
  return MasterConfig.get(
    `${API_PREFIX}Employee/GetEmployeeById?userId=${data}`
  )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
export const getUserLeaveByIdService = (data) => {
  return MasterConfig.get(
    `${API_PREFIX}UserLeave/GetAllUserLeave?userid=${data}`
  )
    .then((res) => {
      console.log(res, "resssssssssssssss");
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
export const addUserLeaveByIdService = (args) => {
  //TODO: convert payload into formData
  const formData = jsonToFormData(args);
  return MasterConfig.post(`${API_PREFIX}UserLeave/AddUserLeave`, formData)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
export const updateUserLeaveService = (args) => {
  console.log(args, "servive payload");

  return MasterConfig.put(`${API_PREFIX}UserLeave/UpdateUserLeave`, args)
    .then((res) => {
      console.log(res.data, "resdeaa");
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
