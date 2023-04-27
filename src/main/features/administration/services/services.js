import MasterConfig from "../../../../utils/services/MasterConfig";

export const GetAllWizardService = () => {
  return MasterConfig.get(`api/Wizard/GetAllWizard`)
    .then((res) => {
      console.log(res, "GetAllWizardService");
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const seenWizardService = (data) => {
  return MasterConfig.get(`api/Wizard/SeenWizard`,data)
    .then((res) => {
      console.log(res, "seenWizardService");
      return res;
    })
    .catch((error) => {
      return error;
    });
};
