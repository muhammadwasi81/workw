// import AxiosConfig from "../../../../utils/services/AxiosConfig";
import MasterConfig from "../../../../utils/services/MasterConfig";
const API_PREFIX = "api/BusinessPolicy/";

export const addTaxSlabGroupService = (data) => {
  return MasterConfig.post(`api/TaxSlab/AddTaxSlabGroup`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getAllTaxSlabGroupService = (data) => {
  return MasterConfig.post(`api/TaxSlab/GetAllTaxSlabGroup`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const updateTaxSlabGroupService = (args) => {
  console.log(args, "tax labbbbbb");
  return MasterConfig.put(`api/TaxSlab/UpdateTaxSlabGroup`, args)

    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
export const getTaxSlabByIdService = (id) => {
  return MasterConfig.get(`api/TaxSlab/GetTaxSlabGroupById?id=${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};
export const removeTaxSlabService = (id) => {
  console.log(id, "idddservice");
  return MasterConfig.delete(`api/TaxSlab/RemoveTaxSlabGroup?id=${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
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
