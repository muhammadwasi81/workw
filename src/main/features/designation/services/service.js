import MasterConfig from "../../../../utils/services/MasterConfig";

export const getAllDesignationsService = () => {
	return 	MasterConfig.get(`api/Designation/getalldesignation`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const addDesignationService = args => {
	return MasterConfig.post(`api/Designation/addDesignation`, args)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
export const updateDesignationService = args => {
	return MasterConfig.put(`api/Designation/updatedesignation`, args)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
export const removeDesignationService = id => {
	return MasterConfig.delete(`api/Designation/removedesignation?id=${id}`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
