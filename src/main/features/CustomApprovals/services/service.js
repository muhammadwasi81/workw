import MasterConfig from "../../../../utils/services/MasterConfig";

export const getAllCustomApprovalService = (data) => {
  return MasterConfig.post(`api/CustomApproval/GetAllCustomApproval`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
