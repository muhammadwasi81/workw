import MasterConfig from "../../../../utils/services/MasterConfig";

export const getAllJobDescriptionService = () => {
  return MasterConfig.get(`api/designation/GetAllDesignation`) 
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};


export const addJobDescriptionService = (args) => {
  return MasterConfig.post(`api/designation/addDesignation`, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
