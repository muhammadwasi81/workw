import AxiosConfig from "../AxiosConfig";

export const EmailConfigServices = {
  getTableData: (type) => {
    return AxiosConfig.get(`/konnectmailbox/api/${type}`);
  },
  setTableData: (data, setApi) => {
    return AxiosConfig.post(`/konnectmailbox/api/${setApi}`, data);
  },
  deleteTableData: (id, type) => {
    return AxiosConfig.delete(`/konnectmailbox/api/${type}?id=${id}`);
  },
  updateTableData: (val, type) => {
    // console.log("val",val)
    return AxiosConfig.put(`/konnectmailbox/api/${type}`, val);
  },
};
