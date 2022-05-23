import AxiosConfig from "../../../../utils/services/AxiosConfig";
const API_PREFIX = "api/Employee/";

export const addEmployeeService = (data) => {
  return AxiosConfig.post(`${API_PREFIX}AddEmployee`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getAllEmployeesService = () => {
  return AxiosConfig.get(`${API_PREFIX}GetAllEmployeeShort`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
