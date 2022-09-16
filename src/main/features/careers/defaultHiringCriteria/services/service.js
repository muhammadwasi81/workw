import MasterConfig from "../../../../../utils/services/MasterConfig";

export const getAllDefaultHiringCriteriaService = () => {
	return MasterConfig.get(`api/DefaultHiringCriteria/GetAllDefaultHiringCriteria`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const addDefaultHiringCriteriaService = args => {
	return MasterConfig.post(`api/DefaultHiringCriteria/AddDefaultHiringCriteria`, args)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
export const updateDefaultHiringCriteriaService = args => {
	return MasterConfig.put(`api/DefaultHiringCriteria/UpdateDefaultHiringCriteria`, args)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
export const removeDefaultHiringCriteriaService = id => {
	return MasterConfig.delete(`api/DefaultHiringCriteria/RemoveDefaultHiringCriteria?id=${id}`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
