import MasterConfig from '../../../../utils/services/MasterConfig';

export const getAllAssetCategoriesService = () => {
  return MasterConfig.get(`api/Asset/GetAllItemCategory`)
    .then((res) => {
      console.log(res.data, 'getAllAssetsCategories services');
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addAssetCategoryService = (args) => {
  return MasterConfig.post(`api/Asset/AddItemCategory`, args)
    .then((res) => {
      console.log(res.data, 'addAssetCategory');
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const updateAssetCategoryService = (args) => {
  return MasterConfig.put(`api/Asset/UpdateItemCategory`, args)
    .then((res) => {
      console.log(res.data, 'updateAssetCategory');
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
