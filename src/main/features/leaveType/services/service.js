import AxiosConfig from "../../../../utils/services/AxiosConfig";

const API_PREFIX = "konnectapi/api/leave/leavetype/";
export const getAllLeaveTypeService = () => {
  return AxiosConfig.get(`${API_PREFIX}getallleavetype`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addLeaveTypeService = (args) => {
  return AxiosConfig.post(`${API_PREFIX}addleavetype`, args)
    .then((res) => {    
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
