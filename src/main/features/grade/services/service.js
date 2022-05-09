import AxiosConfig from "../../../../utils/services/AxiosConfig";

const API_PREFIX = "konnectapi/api/grade/";
export const getAllGradesService = () => {
  return AxiosConfig.get(`${API_PREFIX}getallgrade`)
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
