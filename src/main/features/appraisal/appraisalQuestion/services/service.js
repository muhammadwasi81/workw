import MasterConfig from "../../../../../utils/services/MasterConfig";

export const getAllAppraisalQuestionService = () => {
  return MasterConfig.get(`api/appraisal/getallquestion`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addAppraisalQuestionService = (args) => {
  return MasterConfig.post(`api/appraisal/addquestion`, args)
    .then((res) => {
      return res.data;
    })

    .catch((err) => {
      return err;
    });
};
