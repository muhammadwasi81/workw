import AxiosConfig from "../../../../utils/services/AxiosConfig";

const API_PREFIX = "konnectmailbox/api/EmailConfiguration/";

export const getAllEmailConfigurationsService = () => {
  return AxiosConfig.get(`api/Mailbox/GetAllBusinessEmailConfiguration`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addEmailConfigurationService = (args) => {
  console.log(args, "argssss");
  return AxiosConfig.post(`api/Mailbox/AddBusinessEmailConfiguration`, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
