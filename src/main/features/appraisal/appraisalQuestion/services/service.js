import MasterConfig from "../../../../../utils/services/MasterConfig";

export const getAllAppraisalQuestionService = () => {
  return MasterConfig.get(`api/appraisal/getAllQuestion`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addAppraisalQuestionService = (args) => {
  return MasterConfig.post(`api/appraisal/AddQuestion`, args)
    .then((res) => {
      return res.data;
    })

    .catch((err) => {
      return err;
    });
};
