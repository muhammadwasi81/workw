import AxiosConfig from "../../../../utils/services/AxiosConfig";

export const getAllPaymentService = (payload) => {
  //TODO: url will be changed
  return AxiosConfig.post(`api/Payment/GetAllPayment`, payload)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
