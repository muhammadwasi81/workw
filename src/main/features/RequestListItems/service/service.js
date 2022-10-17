import MasterConfig from '../../../../utils/services/MasterConfig';

export const getAllRequestListItemsService = (data) => {
  return MasterConfig.post(`api/RequestForItem/GetAllRequestForItem`, data)
    .then((res) => {
      console.log(res.data, 'GetAllRequestForItem service');
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addRequestListItemsService = async (data) => {
  return MasterConfig.post(`api/RequestForItem/AddRequestForItem`, data)
    .then((res) => {
      console.log(res.data, 'addRequestListItemsService service');
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const getRequestListItemsByIdService = (id) => {
  return MasterConfig.get(`api/RequestForItem/GetRequestForItemById?id=${id}`)
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
    `api/RequestForItem/GetAllRequestForItemPaging`,
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
