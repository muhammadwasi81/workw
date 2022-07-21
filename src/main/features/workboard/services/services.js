import MasterConfig from "../../../../utils/services/MasterConfig";
const API_PREFIX = "api/WorkBoard/";
const WORKBOARD_API_PREFIX = "api/WorkBoardSection/";
const TODO_API_PREFIX = "api/WorkBoardTodo/";
export const addWorkboardService = data => {
	return MasterConfig.post(`${API_PREFIX}AddWorkBoard`, data)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const updateWorkboardService = data => {
	return MasterConfig.put(`${API_PREFIX}UpdateWorkBoard`, data)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getAllWorkboardService = data => {
	return MasterConfig.post(`${API_PREFIX}GetAllWorkBoard`, data)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getWorkboardByIdService = id => {
	return MasterConfig.get(`${API_PREFIX}GetWorkBoardById?id=${id}`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getWorkboardTodoByIdService = id => {
	return MasterConfig.get(`${TODO_API_PREFIX}GetWorkBoardTodoById?id=${id}`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const addWorkBoardSectionService = data => {
	return MasterConfig.post(`${WORKBOARD_API_PREFIX}AddWorkBoardSection`, data)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const updateWorkBoardSectionColorCodeService = data => {
	// console.log("data", data);
	return MasterConfig.post(
		`${WORKBOARD_API_PREFIX}UpdateWorkBoardSectionColorCode`,
		data
	)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const updateWorkBoardSectionTitleService = data => {
	return MasterConfig.post(
		`${WORKBOARD_API_PREFIX}UpdateWorkBoardSectionName`,
		data
	)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const moveWorkBoardSectionService = data => {
	return MasterConfig.post(
		`${WORKBOARD_API_PREFIX}MoveWorkBoardSection`,
		data
	)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const addWorkBoardSectionTodoService = data => {
	return MasterConfig.post(`${TODO_API_PREFIX}AddWorkBoardTodo`, data)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const updateWorkBoardTodoDescService = data => {
	return MasterConfig.post(
		`${TODO_API_PREFIX}UpdateWorkBoardTodoDescription`,
		data
	)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const updateWorkBoardTodoTitleService = data => {
	return MasterConfig.post(`${TODO_API_PREFIX}UpdateWorkBoardTodoTitle`, data)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const uploadWorkBoardTodoImageService = data => {
	return MasterConfig.post(`${TODO_API_PREFIX}UpdateWorkBoardTodoImage`, data)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const updateWorkBoardTodoDueDateService = data => {
	return MasterConfig.post(
		`${TODO_API_PREFIX}UpdateWorkBoardTodoDueDate`,
		data
	)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const removeWorkBoardTodoImageService = data => {
	return MasterConfig.delete(
		`${TODO_API_PREFIX}RemoveWorkBoardTodoImage?id=${data.id}`
	)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};
