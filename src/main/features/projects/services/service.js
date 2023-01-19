import MasterConfig from "../../../../utils/services/MasterConfig";
const API_PREFIX = "api/Project/";

const getAllSticky_SD = (data) => {
  return {
    pageNo: data.pageNo ? data.pageNo : 1,
    pageSize: data.pageSize ? data.pageSize : 20,
    search: data.search ? data.search : "",
    filterSortBy: data.filterSortBy ? data.filterSortBy : 1,
  };
};
export const getAllProjectsService = (data) => {
  return MasterConfig.post(`${API_PREFIX}GetAllProject`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getProjectByIdService = (id) => {
  return MasterConfig.get(`${API_PREFIX}GetProjectById?id=${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const updateProjectService = (data) => {
  return MasterConfig.put(`${API_PREFIX}UpdateProject`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addProjectService = (data) => {
  return MasterConfig.post(`${API_PREFIX}AddProject`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const removeProjectFeatureService = ({ id, featureId }) => {
  console.log(id, featureId, "id in service");
  return MasterConfig.delete(
    `${API_PREFIX}RemoveProjectFeature?id=${id}&featureId=${featureId}`
  )
    .then((res) => {
      console.log(res.data, "removeProjectFeatureService");
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addProjectFeatureService = (data) => {
  console.log(data, "payload in service");
  return MasterConfig.post(`${API_PREFIX}AddProjectFeature`, data)
    .then((res) => {
      console.log(res.data, "addProjectFeatureService");
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const saveProjectStickyNotesService = (data) => {
  return MasterConfig.post(`api/StickyNotes/SaveProjectStickyNotes`, data)
    .then((res) => {
      console.log(res.data, "project sticky");
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const saveStickyNotesTitleService = (data) => {
  return MasterConfig.post(`api/StickyNotes/SaveTitleProjectStickyNotes`, data)
    .then((res) => {
      console.log(res.data, "project sticky title");
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getAllProjectStickyService = (data) => {
  let request = getAllSticky_SD(data);
  return MasterConfig.post(`api/StickyNotes/GetAllProjectStickyNotes`, request)
    .then((res) => {
      console.log(res.data, "get project sticky");
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
