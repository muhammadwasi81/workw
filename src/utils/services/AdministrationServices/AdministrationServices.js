import AxiosConfig from "../AxiosConfig";

export const AdministrationService = {
  getTableData: (type) => { 
      if (type.includes("EmailConfiguration")) {
        return AxiosConfig.get(`/konnectmailbox/api/${type}`)
      }if (type.includes("OfficeTiming")) {
        return AxiosConfig.get(`/konnectapi/api/${type}`)
      }
      else{
        return AxiosConfig.get(`/konnectapi/api/Administration/${type}`)
      }
    // return type.includes("EmailConfiguration") ? 
    // AxiosConfig.get(`/konnectmailbox/api/${type}`) : AxiosConfig.get(`/konnectapi/api/Administration/${type}`) 
  },
  setTableData: (data, setApi) => {
    if (setApi.includes("EmailConfiguration")) {
      return  AxiosConfig.post(`/konnectmailbox/api/${setApi}`, data)
    }if (setApi.includes("OfficeTiming")) {
      return AxiosConfig.post(`/konnectapi/api/${setApi}`, data)
    } else {
      return AxiosConfig.post(`/konnectapi/api/Administration/${setApi}`, data)
    }
    // return setApi.includes("EmailConfiguration") ?
    // AxiosConfig.post(`/konnectmailbox/api/${setApi}`, data) : AxiosConfig.post(`/konnectapi/api/Administration/${setApi}`, data)
  },
  deleteTableData: (id, type) => {
    return type.includes("EmailConfiguration") ?
    AxiosConfig.delete(`/konnectmailbox/api/${type}?id=${id}`) : AxiosConfig.delete(`/konnectapi/api/Administration/${type}?id=${id}`)
  },
  updateTableData: (val, type) => {
    console.log("hello",type)
    return type.includes("EmailConfiguration") ?
    AxiosConfig.put(`/konnectmailbox/api/${type}`, val) : AxiosConfig.put(`/konnectapi/api/Administration/${type}`, val);
  },
};
