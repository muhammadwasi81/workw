import MasterConfig from '../../../../utils/services/MasterConfig';

export const getAllInventoryAssetService = async (data) => {
  return MasterConfig.post(`/api/InventoryAsset/GetAllAsset`, data)
    .then((res) => {
      console.log(res.data, 'getAllInventoryAssetService service');
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addInventoryAssetService = async (data) => {
  return MasterConfig.post(`/api/InventoryAsset/AddAsset`, data)
    .then((res) => {
      console.log(res.data, 'addInventoryAssetService service');
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const getInventoryAssetByIdService = async (id) => {
  return MasterConfig.get(`/api/InventoryAsset/GetAssetById?id=${id}`)
    .then((res) => {
      console.log(res.data, 'getInventoryAssetByIdService service');
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const getAllAssetForPagingService = async (data) => {
  return MasterConfig.post(`/api/InventoryAsset/GetAllAssetPaging`, data)
    .then((res) => {
      console.log(res.data, 'getAllAssetForPagingService service');
      return res;
    })
    .catch((res) => {
      return res;
    });
};
