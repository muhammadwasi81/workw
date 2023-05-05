import MasterConfig from "../../../../utils/services/MasterConfig";

export const getAllBusinessEmailConfigurationService = () => {
  return MasterConfig.get(`api/Mailbox/GetAllBusinessEmailConfiguration`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addBusinessEmailConfigurationService = (args) => {
  console.log(args, "argssss");
  return MasterConfig.post(`api/Mailbox/AddBusinessEmailConfiguration`, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
