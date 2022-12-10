import MasterConfig from "../../../../utils/services/MasterConfig";

export const addEmployeeService = async (data) => {
  return MasterConfig.post(`/api/Employee/AddEmployee`, data)
    .then((res) => {
      console.log(res.data, "addEmployeeService service");
      return res;
    })
    .catch((err) => {
      console.log(err.message, "error in addEmployee");
      return err;
    });
};

export const getAllEmployeeService = async (data) => {
  return MasterConfig.post(`/api/Employee/GetAllEmployeeShort`, data)
    .then((res) => {
      console.log(res.data, "GetAllEmployeeShort service");
      return res.data;
    })
    .catch((err) => {
      console.log(err.message, "error in GetAllEmployeeShort");
      return err;
    });
};

export const getEmployeeByIdService = async (id) => {
  return MasterConfig.get(`/api/Employee/GetEmployeeById?id=${id}`)
    .then((res) => {
      console.log(res.data, "getEmployeeByIdService service");
      return res;
    })
    .catch((err) => {
      console.log(err.message, "error in getEmployeeByIdService");
      return err;
    });
};

export const updateEmployeeService = async (data) => {
  return MasterConfig.post(`/api/Employee/UpdateEmployee`, data)
    .then((res) => {
      console.log(res.data, "updateEmployeeService service");
      return res;
    })
    .catch((err) => {
      console.log(err.message, "error in updateEmployeeService");
      return err;
    });
};

export const getWorkplace = async (userId) => {
  return MasterConfig.get(
    `/api/UserWorkExperience/GetAllUserWorkExperience?userId=${userId}`
  )
    .then((res) => {
      console.log(res.data, "workplace service");
      return res;
    })
    .catch((err) => {
      console.log(err.message, "error in workplaceService");
      return err;
    });
};

export const getEducation = async (userId) => {
  return MasterConfig.get(
    `/api/UserEducation/GetAllUserEducation?userId=${userId}`
  )
    .then((res) => {
      console.log(res.data, "education service");
      return res;
    })
    .catch((err) => {
      console.log(err.message, "error in education");
      return err;
    });
};
