import MasterConfig from "../../../../utils/services/MasterConfig";
const API_PREFIX = "api/WorkBoard/";
const WORKBOARD_API_PREFIX = "api/WorkBoardSection/";
const TODO_API_PREFIX = "api/WorkBoardTodo/";
export const addWorkboardService = (data) => {
  return MasterConfig.post(`${API_PREFIX}AddWorkBoard`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getAllWorkboardTodoPagingService = (data) => {
  return MasterConfig.post(`${TODO_API_PREFIX}GetAllWorkBoardTodoPaging`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateWorkboardService = (data) => {
  return MasterConfig.put(`${API_PREFIX}UpdateWorkBoard`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getAllWorkboardService = (data) => {
  return MasterConfig.post(`${API_PREFIX}GetAllWorkBoard`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getWorkboardByIdService = (id) => {
  return MasterConfig.get(`${API_PREFIX}GetWorkBoardById?id=${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getWorkboardTodoByIdService = (id) => {
  return MasterConfig.get(`${TODO_API_PREFIX}GetWorkBoardTodoById?id=${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addWorkBoardSectionService = (data) => {
  return MasterConfig.post(`${WORKBOARD_API_PREFIX}AddWorkBoardSection`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateWorkBoardSectionColorCodeService = (data) => {
  // console.log("data", data);
  return MasterConfig.post(
    `${WORKBOARD_API_PREFIX}UpdateWorkBoardSectionColorCode`,
    data
  )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateWorkBoardSectionTitleService = (data) => {
  return MasterConfig.post(
    `${WORKBOARD_API_PREFIX}UpdateWorkBoardSectionName`,
    data
  )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const moveWorkBoardSectionService = (data) => {
  return MasterConfig.post(`${WORKBOARD_API_PREFIX}MoveWorkBoardSection`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const moveWorkBoardSectionTodoService = (data) => {
  return MasterConfig.post(`${TODO_API_PREFIX}MoveWorkBoardTodo `, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addWorkBoardSectionTodoService = (data) => {
  return MasterConfig.post(`${TODO_API_PREFIX}AddWorkBoardTodo`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addWorkBoardTodoLabelService = (data) => {
  return MasterConfig.post(`${TODO_API_PREFIX}AddWorkBoardTodoLabel`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateWorkBoardTodoDescService = (data) => {
  return MasterConfig.post(
    `${TODO_API_PREFIX}UpdateWorkBoardTodoDescription`,
    data
  )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateWorkBoardTodoTitleService = (data) => {
  return MasterConfig.post(`${TODO_API_PREFIX}UpdateWorkBoardTodoTitle`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const uploadWorkBoardTodoImageService = (data) => {
  return MasterConfig.post(`${TODO_API_PREFIX}UpdateWorkBoardTodoImage`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const updateWorkBoardTodoDueDateService = (data) => {
  return MasterConfig.post(`${TODO_API_PREFIX}UpdateWorkBoardTodoDueDate`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const removeWorkBoardTodoImageService = (data) => {
  return MasterConfig.delete(
    `${TODO_API_PREFIX}RemoveWorkBoardTodoImage?id=${data.id}`
  )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const removeWorkBoardTodoService = (data) => {
  return MasterConfig.delete(
    `${TODO_API_PREFIX}RemoveWorkBoardTodo?todoId=${data.id}`
  )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const removeWorkBoardTodoLabelService = (data) => {
  return MasterConfig.delete(
    `${TODO_API_PREFIX}RemoveWorkBoardTodoLabel?id=${data.id}`
  )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};
export const addWorkBoardMemberService = (data) => {
  const id = data.id;
  let memberId = data.memberId;
  let member = [
    {
      memberId: memberId,
      memberType: 1,
    },
  ];
  return MasterConfig.post(`api/WorkBoard/AddWorkBoardMember?id=${id}`, member)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const addWorkBoardTodoMemberService = (data) => {
  console.log(data,"datataa");
  const id = data.membersData.id;
  let memberId = data.membersData.memberId;
  let member = [
    {
      memberId: memberId,
    },
  ];
  return MasterConfig.post(`api/WorkBoardTodo/AddWorkBoardTodoMember?id=${id}`, member)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getWorkBoardMemberService = (id) => {
  return MasterConfig.get(`api/WorkBoard/GetAllWorkBoardMember?id=${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const removeWorkBoardMemberService = (data) => {
  const id = data.id;
  const memberId = data.memberId;
  return MasterConfig.post(`api/WorkBoard/RemoveWorkBoardMember?id=${id}`, [
    memberId,
  ])
    .then((res) => { 
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};

export const removeWorkBoardTodoMemberService = (data) => {

  const id = data.id;
  const memberId = data.memberId;
  return MasterConfig.post(`api/WorkBoardTodo/RemoveWorkBoardTodoMember?id=${id}`, [
    memberId,
  ])
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error;
    });
};
