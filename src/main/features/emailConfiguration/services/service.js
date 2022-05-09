import AxiosConfig from "../../../../utils/services/AxiosConfig";

const API_PREFIX = "konnectmailbox/api/EmailConfiguration/";
export const getAllEmailConfigurationsService = () => {
  return AxiosConfig.get(`${API_PREFIX}getEmailConfigurationByBusinessId`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addEmailConfigurationService = (args) => {
  return AxiosConfig.post(`${API_PREFIX}addEmailConfiguration`, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
