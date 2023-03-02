import MasterConfig from "../../../../utils/services/MasterConfig";
export const getAllBillingService = (payload) => {
  console.log(payload, "PAYLOAD");
  //TODO: url will be changed
  return MasterConfig.post(`/api/Payment/GetAllBilling`, payload)
    .then((res) => {
      console.log(res, "resssss");

      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
