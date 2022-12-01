import MasterConfig from '../../../../utils/services/MasterConfig';

export const getAllDefaultApprovers = () => {
  return MasterConfig.post(`/api/DefaultApproval/GetAllDefaultApproval`)
    .then((res) => {
      console.log(res.data, 'getAllDefaultApprovers service');
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const getDefaultApproversById = (id) => {
  return MasterConfig.get(`/api/DefaultApproval/GetApprovalById?id=${id}`)
    .then((res) => {
      console.log(res.data, 'getDefaultApproversById service');
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const addDefaultApprovers = (data) => {
  return MasterConfig.post(`/api/DefaultApproval/AddDefaultApproval`, data)
    .then((res) => {
      console.log(res.data, 'addDefaultApprovers service');
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const deleteDefaultApproversById = (id) => {
  return MasterConfig.delete(`/api/DefaultApproval/DeleteApproval?id=${id}`)
    .then((res) => {
      console.log(res.data, 'deleteDefaultApproversById service');
      return res;
    })
    .catch((res) => {
      return res;
    });
};
