import MasterConfig from "../../../../utils/services/MasterConfig";

export const getAllCustomApprovalCategoryService = () => {
  return MasterConfig.get(`api/CustomApprovalCategory/getallCustomApprovalCategory`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addCustomApprovalCategoryService = (args) => {
  return MasterConfig.post(`api/CustomApprovalCategory/addCustomApprovalCategory`, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
