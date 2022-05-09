import AxiosConfig from "../../../../utils/services/AxiosConfig";

const API_PREFIX = "KonnectMessenger/api/Messenger/";
export const getAllChatsService = () => {
  return AxiosConfig.get(`${API_PREFIX}getAllChats`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addGradeService = (args) => {
  return AxiosConfig.post(`${API_PREFIX}addgrade`, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
