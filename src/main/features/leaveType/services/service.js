import MasterConfig from "../../../../utils/services/MasterConfig";

// const API_PREFIX = "konnectapi/api/leave/leavetype/";
export const getAllLeaveTypeService = () => {
  return MasterConfig.get(`api/leave/leavetype/getallleavetype`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addLeaveTypeService = (args) => {
  return MasterConfig.post(`api/leave/leavetype/addleavetype`, args)
    .then((res) => {    
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
