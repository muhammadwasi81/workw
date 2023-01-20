// import AxiosConfig from "../../../../utils/services/AxiosConfig";
import MasterConfig from '../../../../utils/services/MasterConfig';
const API_PREFIX = 'api/AccessRole/';

export const addAccessRoleService = (data) => {
  console.log(data, 'data in service');
  return MasterConfig.post(`${API_PREFIX}AddAccessRole`, data)
    .then((res) => {
      console.log(res, 'addAccessRoleService');
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getAllAccessRolesService = () => {
  return MasterConfig.get(`${API_PREFIX}GetAllAccessRole`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getAccessRoleByIdService = (data) => {
  return MasterConfig.get(`${API_PREFIX}GetAccessRoleById?accessRoleId=${data}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateAccessRoleByIdService = (data) => {
  return MasterConfig.put(`${API_PREFIX}UpdateAccessRole`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};
