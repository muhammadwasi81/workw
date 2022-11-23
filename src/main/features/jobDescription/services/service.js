import MasterConfig from '../../../../utils/services/MasterConfig';

export const getAllJobDescriptionService = () => {
  return MasterConfig.get(`api/JobDescription/GetAllJobDescription`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addJobDescriptionService = (args) => {
  return MasterConfig.post(`api/JobDescription/AddJobDescription`, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
