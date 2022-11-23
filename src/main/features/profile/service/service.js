import MasterConfig from '../../../../utils/services/MasterConfig';

export const addEmployeeService = async (data) => {
  return MasterConfig.post(`/api/Employee/AddEmployee`, data)
    .then((res) => {
      console.log(res.data, 'addEmployeeService service');
      return res;
    })
    .catch((err) => {
      console.log(err.message, 'error in addEmployee');
      return err;
    });
};

export const getAllEmployeeService = async (data) => {
  return MasterConfig.post(`/api/Employee/GetAllEmployeeShort`, data)
    .then((res) => {
      console.log(res.data, 'GetAllEmployeeShort service');
      return res.data;
    })
    .catch((err) => {
      console.log(err.message, 'error in GetAllEmployeeShort');
      return err;
    });
};

export const getEmployeeByIdService = async (id) => {
  return MasterConfig.get(`/api/Employee/GetEmployeeById?id=${id}`)
    .then((res) => {
      console.log(res.data, 'getEmployeeByIdService service');
      return res;
    })
    .catch((err) => {
      console.log(err.message, 'error in getEmployeeByIdService');
      return err;
    });
};

export const updateEmployeeService = async (data) => {
  return MasterConfig.post(`/api/Employee/UpdateEmployee`, data)
    .then((res) => {
      console.log(res.data, 'updateEmployeeService service');
      return res;
    })
    .catch((err) => {
      console.log(err.message, 'error in updateEmployeeService');
      return err;
    });
};
