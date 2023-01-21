import AxiosConfig from "../../../../utils/services/AxiosConfig";

const API_PREFIX = "konnectmailbox/api/EmailConfiguration/";

export const getAllUserEmailConfigurationsService = (id) => {
  return AxiosConfig.get(`api/Mailbox/GetAllUserEmailConfiguration?id=${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addUserEmailConfigurationService = (args) => {
  console.log(args, "argssss");
  return AxiosConfig.post(`api/Mailbox/AddUserEmailConfiguration`, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getAllBussinessEmailConfigurationService = () => {
  return AxiosConfig.get(`api/Mailbox/GetAllBusinessEmailConfiguration`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
