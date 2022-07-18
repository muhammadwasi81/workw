import MasterConfig from "../../../../utils/services/MasterConfig";

export const getAllBonusService = (data) => {
  return MasterConfig.post(`api/Bonus/GetAllBonus`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addPromotionService = (data) => {
  return MasterConfig.post(`api/Promotion/AddPromotion`, data)
    .then((res) => {
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const GetPromotionByIdService = (id) => {
  return MasterConfig.get(`api/Promotion/GetPromotionById?id=${id}`)
    .then((res) => {
      return res;
    })
    .catch((res) => {
      return res;
    });
};
