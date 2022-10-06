import MasterConfig from "../../../../../../utils/services/MasterConfig";

export const getAllCareerService = () => {
  return MasterConfig.get(`api/Career/GetAllCareer`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
