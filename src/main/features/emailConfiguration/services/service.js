import AxiosConfig from "../../../../utils/services/AxiosConfig";

export const getAllBusinessEmailConfigurationService = () => {
  return AxiosConfig.get(`api/Mailbox/GetAllBusinessEmailConfiguration`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addBusinessEmailConfigurationService = (args) => {
  console.log(args, "argssss");
  return AxiosConfig.post(`api/Mailbox/AddBusinessEmailConfiguration`, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
