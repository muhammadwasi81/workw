import MasterConfig from '../../../../utils/services/MasterConfig';

export const getAllRequestListItemsService = (data) => {
  return MasterConfig.post(
    `api/InventoryRequestForItem/GetAllRequestForItem`,
    data
  )
    .then((res) => {
      console.log(res.data, 'GetAllRequestForItem service');
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addRequestListItemsService = async (data) => {
  return MasterConfig.post(
    `api/InventoryRequestForItem/AddRequestForItem`,
    data
  )
    .then((res) => {
      console.log(res.data, 'addRequestListItemsService service');
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const getRequestListItemsByIdService = (id) => {
  return MasterConfig.get(
    `api/InventoryRequestForItem/GetRequestForItemById?id=${id}`
  )
    .then((res) => {
      console.log(res.data, 'getRequestListItemsByIdService service');
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const getAllRequestForPagingService = (data) => {
  return MasterConfig.post(
    `api/InventoryRequestForItem/GetAllRequestForItemPaging`,
    data
  )
    .then((res) => {
      console.log(res.data, 'getAllRequestForPagingService service');
      return res;
    })
    .catch((res) => {
      return res;
    });
};
