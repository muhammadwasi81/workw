// import AxiosConfig from "../../../../utils/services/AxiosConfig";
import MasterConfig from "../../../../utils/services/MasterConfig";
const API_PREFIX = "api/BusinessPolicy/";

export const addBusinessPolicyService = (data) => {
  return MasterConfig.post(`${API_PREFIX}AddBusinessPolicy`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getAllBusinessPolicyService = (search = "") => {
  return MasterConfig.get(`${API_PREFIX}GetAllBusinessPolicy?search=${search}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const removeBusinessPolicyService = (id) => {
  return MasterConfig.delete(`${API_PREFIX}RemoveBusinessPolicy?id=${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateBusinessPolicyService = (data) => {
  return MasterConfig.put(`${API_PREFIX}UpdateBusinessPolicy`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};
