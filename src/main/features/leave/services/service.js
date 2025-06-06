import { jsonToFormData } from "../../../../utils/base";
import MasterConfig from "../../../../utils/services/MasterConfig";

export const getAllLeaveService = (data) => {
  return MasterConfig.post(`api/Leave/GetAllLeave`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addLeaveService = async (data) => {
  const formData = jsonToFormData(data);
  return MasterConfig.post(`api/Leave/AddLeave`, formData)
    .then((res) => {
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const GetLeaveByIdService = (id) => {
  return MasterConfig.get(`api/Leave/GetLeaveById?id=${id}`)
    .then((res) => {
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const GetLeaveUserByIdService = (id) => {
  return MasterConfig.get(`api/Leave/GetLeaveUserById?userId=${id}`)
    .then((res) => {
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const GetLeaveTypeService = (args) => {
  console.log(args, "leave service");
  return MasterConfig.get(`api/LeaveType/GetAllLeaveType`, args)
    .then((res) => {
      return res;
    })
    .catch((res) => {
      return res;
    });
};
