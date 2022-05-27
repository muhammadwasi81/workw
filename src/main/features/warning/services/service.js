import MasterConfig from "../../../../utils/services/MasterConfig";

export const getAllWarningService = data => {
	return MasterConfig.post(`api/Warning/GetAllWarning`, data)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const addWarningService = data => {
	return MasterConfig.post(`api/Warning/WarningAdd`, data)
		.then(res => {
			return res;
		})
		.catch(res => {
			return res;
		});
};

export const GetWarningByIdService = id => {
	return MasterConfig.get(`api/Warning/GetWarningById?id=${id}`)
		.then(res => {
			return res;
		})
		.catch(res => {
			return res;
		});
};