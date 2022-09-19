import MasterConfig from "../../../../utils/services/MasterConfig";


export const getAllRebateCategoriesService = () => {
	return MasterConfig.get(`api/RebateCategory/GetAllRebateCategory`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const addRebateCategoryService = args => {
	return MasterConfig.post(`api/rebateCategory/AddRebateCategory`, args)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
export const updateRebateCategoryService = args => {
	return MasterConfig.put(`api/rebateCategory/updateRebateCategory`, args)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
export const removeRebateCategoryService = id => {
	return MasterConfig.delete(`api/rebateCategory/removerebateCategory?id=${id}`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
