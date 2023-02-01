// import AxiosConfig from "../../../../utils/services/AxiosConfig";
import { jsonToFormData } from "../../../../utils/base";
import MasterConfig from "../../../../utils/services/MasterConfig";
const API_PREFIX = "api/Employee/";

export const addEmployeeService = (data) => {
  const formData = jsonToFormData(data);
  return MasterConfig.post(`${API_PREFIX}AddEmployee`, formData)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addEmployeeFamilyService = (data) => {
  console.log(data, "in service");
  const formData = jsonToFormData(data);
  return MasterConfig.post(`${API_PREFIX}AddEmployeeFamily`, formData)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateEmployeeFamilyService = (data) => {
  console.log(data, "in service");
  const formData = jsonToFormData(data);
  return MasterConfig.put(`${API_PREFIX}UpdateEmployeeFamily`, formData)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getAllEmployeeFamilyService = (id) => {
  return MasterConfig.get(`/api/Employee/GetAllEmployeeFamily?userId=${id}`)
    .then((res) => {
      console.log(res.data, "getEmployeeByIdService");
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const removeEmployeeFamilyService = (id) => {
  return MasterConfig.delete(`/api/Employee/RemoveEmployeeFamily?id=${id}`)
    .then((res) => {
      console.log(res.data, "getEmployeeByIdService");
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getAllEmployeesService = (search) => {
  console.log(search, "search");
  return MasterConfig.get(`${API_PREFIX}GetAllEmployeeShort?search=${search}`)
    .then((res) => {
      console.log(res.data, "getAllEmployeesService");
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getEmployeeByIdService = (id) => {
  return MasterConfig.get(`/api/Employee/GetEmployeeById?id=${id}`)
    .then((res) => {
      console.log(res.data, "getEmployeeByIdService");
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const updateEmployeeService = (data) => {
  const formData = jsonToFormData(data);
  console.log(formData, "service");
  return MasterConfig.put(`${API_PREFIX}UpdateEmployee`, formData)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addEmployeeDetailAttachmentService = (data) => {
  const formData = jsonToFormData(data);
  return MasterConfig.post(`${API_PREFIX}AddEmployeeDetailAttachment`, formData)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getAllEmployeeDetailAttachmentService = (id) => {
  return MasterConfig.get(
    `/api/Employee/GetAllEmployeeDetailAttachment?id=${id}`
  )
    .then((res) => {
      console.log(res.data, "getAllEmployeeAttachment");
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const removeEmployeeDetailAttachmentService = (id) => {
  return MasterConfig.delete(
    `/api/Employee/RemoveEmployeeDetailAttachment?id=${id}`
  )
    .then((res) => {
      console.log(res.data, "getAllEmployeeAttachment");
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
