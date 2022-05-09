import AxiosConfig from "../../../../utils/services/AxiosConfig";

const API_PREFIX = "konnectapi/api/appraisal/appraisalQuestion/";
export const getAllAppraisalService = () => {
  return AxiosConfig.get(`${API_PREFIX}getallquestion`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addAppraisalService = (args) => {
  return AxiosConfig.post(`${API_PREFIX}addquestion`, args)
    .then((res) => {
      return res.data;
    })

    .catch((err) => {
      return err;
    });
};
