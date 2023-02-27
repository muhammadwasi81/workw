import MasterConfig from '../../../../utils/services/MasterConfig';
import { jsonToFormData } from '../../../../utils/base';

export const getAllDepartmentService = (data) => {
  console.log(data, 'data in service');
  return MasterConfig.post(`api/Department/GetAllDepartment`, data)
    .then((res) => {
      // console.log("response data from service", res.data);
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addDepartmentService = (data) => {
  console.log('data in service ', data);
  const formData = jsonToFormData(data);
  console.log('formdatatoFormdata', formData);
  return MasterConfig.post(`api/Department/AddDepartment`, formData)
    .then((res) => {
      // console.log(res, "response from dept service");
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const GetDepartmentByIdService = (id) => {
  // console.log("ID FROM SERVICE", id);
  return MasterConfig.get(`api/Department/GetDepartmentById?id=${id}`)
    .then((res) => {
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const getAllDepartmentAppraisalQuestionService = (data) => {
  console.log(data);
  return MasterConfig.get(
    `api/Department/GetAllDepartmentAppraisalQuestion?id=${data}`
  )
    .then((res) => {
      // console.log("response data from service appraisal", res.data);
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addDepartmentAppraisalQuestionService = (data) => {
  // console.log("data from service", data);
  return MasterConfig.post(
    `api/Department/AddDepartmentAppraisalQuestion`,
    data
  )
    .then((res) => {
      // console.log(res, "response from dept service");
      return res;
    })
    .catch((res) => {
      return res;
    });
};

export const removeDepartmentAppraisalQuestionService = (data) => {
  console.log(data);
  return MasterConfig.delete(
    `api/Department/RemoveDepartmentAppraisalQuestion?id=${data.id}`
  )
    .then((res) => {
      // console.log("response data from service appraisal", res.data);
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const updateDepartmentAppraisalQuestionService = (data) => {
  // console.log("update data from service", data);
  return MasterConfig.put(
    `api/Department/UpdateDepartmentAppraisalQuestion`,
    data
  )
    .then((res) => {
      // console.log(res, "response from dept service");
      return res;
    })
    .catch((res) => {
      return res;
    });
};
export const addDepartmentMemberService = (data) => {
  const id = data.id;
  let memberId = data.memberId;
  let member = [
    {
      memberId: memberId,
      memberType: 1,
    },
  ];
  // let memberType = data.memberType;
  // console.log(data, "dataaa");
  return MasterConfig.post(
    `api/Department/AddDepartmentMember?id=${id}`,
    member
  )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getDepartmentMemberService = (id) => {
  return MasterConfig.get(`api/Department/GetAllDepartmentMember?id=${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};
