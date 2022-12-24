import MasterConfig from "../../../../utils/services/MasterConfig";
import { jsonToFormData, STRINGS } from "../../../../utils/base";

export const getBasicInfo = async (id) => {
  return MasterConfig.get(`/api/Employee/GetEmployeeProfileById?id=${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err.message, "error in Basic Info");
      return err;
    });
};

export const updateProfileService = async (args) => {
  const formdataRequest = jsonToFormData(args);
  console.log(formdataRequest, "formdataaa");
  return MasterConfig.put(`/api/Employee/UpdateProfileImage`, formdataRequest)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err.message, "error in Profile Image");
      return err;
    });
};

export const updateEmployeeEmailService = async ({ id, email }) => {
  console.log(id, email, "id emailllll");
  return MasterConfig.put(
    `/api/Employee/UpdateEmployeeEmail?id=${id}&personalEmail=${email}`
  )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err.message, "error in email service");
      return err;
    });
};

export const updateEmployeePhoneNoService = async ({ id, phoneNo }) => {
  return MasterConfig.put(
    `/api/Employee/UpdateEmployeePhoneNo?id=${id}&phoneNo=${phoneNo}`
  )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err.message, "error in phone number");
      return err;
    });
};

export const updateStatusService = async ({ id, about }) => {
  return MasterConfig.put(
    `/api/Employee/UpdateEmployeeAbout?id=${id}&about=${about}`
  )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err.message, "error in Status");
      return err;
    });
};

export const updatePasswordService = async (args) => {
  return MasterConfig.put(`/api/Employee/UpdateEmployeePassword`, args)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err.message, "error in Status");
      return err;
    });
};
