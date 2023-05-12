import MasterConfig from "../../../../utils/services/MasterConfig";

const API_PREFIX = "konnectmailbox/api/EmailConfiguration/";

export const getAllUserEmailConfigurationsService = (id) => {
  return MasterConfig.get(`api/Mailbox/GetAllUserEmailConfiguration?id=${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addUserEmailConfigurationService = (args) => {
  console.log(args, "argssss");
  return MasterConfig.post(`api/Mailbox/AddUserEmailConfiguration`, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const updateUserEmailConfigurationService = (args) => {
  console.log(args, "argssss");
  return MasterConfig.put(`api/Mailbox/UpdateUserEmailConfiguration`, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getAllBussinessEmailConfigurationService = () => {
  return MasterConfig.get(`api/Mailbox/GetAllBusinessEmailConfiguration`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
