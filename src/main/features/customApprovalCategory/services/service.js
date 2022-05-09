import AxiosConfig from "../../../../utils/services/AxiosConfig";

const API_PREFIX = "konnectapi/api/CustomApprovalCategory/";
export const getAllCustomApprovalCategoryService = () => {
  return AxiosConfig.get(`${API_PREFIX}getallCustomApprovalCategory`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addCustomApprovalCategoryService = (args) => {
  return AxiosConfig.post(`${API_PREFIX}addCustomApprovalCategory`, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
