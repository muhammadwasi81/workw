import AxiosConfig from "../../../../utils/services/AxiosConfig";

const API_PREFIX = "konnectapi/api/Designation/";
export const getAllJobDescriptionService = () => {
  return AxiosConfig.get(`${API_PREFIX}GetAllDesignation`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addJobDescriptionService = (args) => {
  return AxiosConfig.post(`${API_PREFIX}addDesignation`, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
