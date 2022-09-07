import MasterConfig from "../../../../utils/services/MasterConfig";

export const getAllLoanService = (data) => {
  return MasterConfig.post(`api/Loan/GetAllLoan`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

// export const addLoanService = (data) => {
//   return MasterConfig.post(`api/Loan/AddLoan`, data)
//     .then((res) => {
//       return res;
//     })
//     .catch((res) => {
//       return res;
//     });
// };

//working
export const GetLoanByIdService = (id) => {
  console.log("ID FROM SERVICE", id);
  return MasterConfig.get(`api/Loan/GetLoanById?id=${id}`)
    .then((res) => {
      return res;
    })
    .catch((res) => {
      return res;
    });
};
