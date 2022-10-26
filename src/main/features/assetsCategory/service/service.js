import MasterConfig from '../../../../utils/services/MasterConfig';

export const getAllAssetCategoriesService = () => {
  return MasterConfig.get(`api/InventoryAsset/GetAllItemCategory`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addAssetCategoryService = (args) => {
  return MasterConfig.post(`api/InventoryAsset/AddItemCategory`, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const updateAssetCategoryService = (args) => {
  return MasterConfig.put(`api/InventoryAsset/UpdateItemCategory`, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
