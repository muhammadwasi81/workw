import AxiosConfig from "../../../../utils/services/AxiosConfig";

export const getAllBillingService = () => {
  //TODO: url will be changed
  return AxiosConfig.get(`api/Mailbox/GetAllBusinessEmailConfiguration`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
