import { jsonToFormData } from "../../../../utils/base";
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

export const addRatingService = async (data) => {
  return MasterConfig.post(`/api/Employee/UserProfileRating`, data)
    .then((res) => {
      console.log(res.data, "Add Rating service");
      return res;
    })
    .catch((err) => {
      console.log(err.message, "error in Rating");
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

export const GetCourseByUserIdService = async (userId) => {
  return MasterConfig.get(
    `/api/ELearning/GetELearningCourseCurriculumTopicAttemptByUser?userId=${userId}`
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

// update user coverImg
export const updateCoverImgService = async (data) => {
  const formData = jsonToFormData(data);
  return MasterConfig.post(`/api/Employee/AddProfileCoverImage`, formData)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const updateUserProfileImgService = async (data) => {
  const formData = jsonToFormData(data);
  return MasterConfig.put(`/api/Employee/UpdateProfileImage`, formData)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const saveProfileStickyNote = async (data) => {
  const formData = jsonToFormData(data);
  return MasterConfig.post(`/api/StickyNotes/SaveProfileStickyNotes`, formData)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const getProfileStickyNote = async (data) => {
  return MasterConfig.get(`/api/StickyNotes/GetProfileStickyNotes`, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
