import MasterConfig from "../../../../utils/services/MasterConfig";
const API_PREFIX = "api/Project/";

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
  return MasterConfig.delete(
    `${API_PREFIX}RemoveProjectFeature?id=${id}&featureId=${featureId}`
  )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addProjectFeatureService = (data) => {
  // const id = features.find((feature) => feature.projectId)?.projectId;
  const id = data.id;
  return MasterConfig.post(
    `${API_PREFIX}AddProjectFeature?id=${id}`,
    data.payload
  )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const saveStickyNoteProject = (data) => {
  return MasterConfig.post(`api/StickyNotes/SaveProjectStickyNotes`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getAllProjectStickyService = (id) => {
  return MasterConfig.get(`api/StickyNotes/GetProjectStickyNotes?id=${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
export const getAllProjectMemberService = (id) => {
  return MasterConfig.get(`api/Project/GetAllProjectMember?id=${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addProjectMemberService = (data) => {
  let id = data.id;
  let memberId = data.memberId;
  let member = [
    {
      memberId: memberId,
      memberType: 1,
    },
  ];
  return MasterConfig.post(`api/Project/AddProjectMember?id=${id}`, member)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const deleteProjectMemberService = (data) => {
  let id = data.id;
  let memberId = data.memberId;
  return MasterConfig.post(`api/Project/RemoveProjectMember?id=${id}`, [
    memberId,
  ])
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addProjectFavoriteService = (payload) => {
  return MasterConfig.get(
    `api/Project/AddProjectFavouriteMark?projectId=${payload.id}&isPinned=${payload.isPinned}`,
    payload.payload
  )
    .then((res) => {
      console.log(res.data, "addProjectFeatureService");
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getProjectFeatureService = (id) => {
  return MasterConfig.get(`api/Project/GetAllProjectFeature?id=${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
