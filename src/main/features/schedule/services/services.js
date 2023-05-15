import MasterConfig from "../../../../utils/services/MasterConfig";
const API_PREFIX = "api/Schedule/";

export const addScheduleService = (data) => {
  return MasterConfig.post(`${API_PREFIX}AddSchedule`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addScheduleMemberService = (data) => {
  return MasterConfig.post(
    `${API_PREFIX}AddScheduleMember?id=${data.id}`,
    data.data
  )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getAllScheduleService = (data) => {
  return MasterConfig.post(`${API_PREFIX}GetAllSchedule`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getAllScheduleMemberService = (id) => {
  return MasterConfig.get(`${API_PREFIX}GetAllScheduleMember?id=${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getScheduleByIdService = (id) => {
  return MasterConfig.get(`${API_PREFIX}GetScheduleById?id=${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateMemberScheduleStatusService = ({ id, status }) => {
  return MasterConfig.get(
    `${API_PREFIX}updateScheduleMemberStatus?id=${id}&status=${status}`
  )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateScheduleMemberTypeService = ({ id, type }) => {
  return MasterConfig.get(
    `${API_PREFIX}updateScheduleMemberType?id=${id}&type=${type}`
  )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};
export const getCalendarService = (data) => {
  return MasterConfig.post(`${API_PREFIX}GetCalendar`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};
