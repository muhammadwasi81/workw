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

export const getAllPendingBillsService = (payload) =>{

  return MasterConfig.post(`api/Payment/GetAllPendingBilling`,payload)
  .then((res)=>{
    console.log("res");

    return res?.data
  })
  .catch((err)=>{
    return err;
  })
}

export const addBillingService = (payload) =>{

  return MasterConfig.post(`api/Payment/AddBilling`,payload)
  .then((res)=>{
    console.log("res");

    return res?.data
  })
  .catch((err)=>{
    return err;
  })
}