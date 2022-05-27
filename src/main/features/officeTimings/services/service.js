import MasterConfig from "../../../../utils/services/MasterConfig";


export const getAllOfficeTimingService = () => {
	return MasterConfig.get(`api/officetiming/getallOfficeTimingGroups`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const addOfficeTimingService = args => {
	return MasterConfig.post(`api/officetiming/addOfficeTimingGroup`, args)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
