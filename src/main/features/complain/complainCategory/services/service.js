import MasterConfig from "../../../../../utils/services/MasterConfig";
export const getAllComplainCategoryService = () => {
	return MasterConfig.get(`api/complain/ComplainCategory/GetAllComplainCategory`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const addComplainCategoryService = args => {
	return MasterConfig.post(`api/complain/ComplainCategory/addComplainCategory`, args)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
export const updateComplainCategoryService = args => {
	return MasterConfig.put(`api/complain/ComplainCategory/updateComplainCategory`, args)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
export const removeComplainCategoryService = id => {
	return MasterConfig.delete(`api/complain/ComplainCategory/removeComplainCategory?id=${id}`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
