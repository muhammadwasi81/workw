import { jsonToFormData } from "../../../../utils/base";
import MasterConfig from "../../../../utils/services/MasterConfig";

  // COURSES SERVICES //

export const addCourseService = async (data) => {
  const formData = jsonToFormData(data);
  return MasterConfig.post(`api/ELearning/AddCasdasdourse`, formData)
    .then((res) => {
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const getAllCourseService = (data) => {
  return MasterConfig.post(`api/ELearning/GetAllCourse`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};


export const GetCourseByIdService = (id) => {
  return MasterConfig.get(`api/ELearning/GetCourseById?id=${id}`)
    .then((res) => {
      return res;
    })
    .catch((res) => {
      return res;
    });
};


  // E-BOOK SERVICES //

export const addBookService = async (data) => {
  const formData = jsonToFormData(data);
  return MasterConfig.post(`api/ELearning/AddBook`, formData)
    .then((res) => {
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const getAllBookService = (data) => {
  return MasterConfig.post(`api/ELearning/GetAllBook`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};