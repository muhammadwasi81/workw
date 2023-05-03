// import AxiosConfig from "../../../../utils/services/AxiosConfig";
import MasterConfig from "../../../../utils/services/MasterConfig";

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
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const updateUserLeaveService = (payload) => {
  return MasterConfig.put(
    `${API_PREFIX}UserLeave/UpdateUserLeave?userid=${payload.id}`,
    payload.Initialinputs
  )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
