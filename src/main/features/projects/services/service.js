import MasterConfig from "../../../../utils/services/MasterConfig";

export const getAllProjectsService = data => {
	return MasterConfig.post(`api/Project/GetAllProject`, data)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
