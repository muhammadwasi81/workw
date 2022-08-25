import MasterConfig from "../../../../utils/services/MasterConfig";

export const getAllLeaveService = data => {
	return MasterConfig.post(`api/Leave/GetAllLeave`, data)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const addLeaveService = data => {
	return MasterConfig.post(`api/Leave/AddLeave`, data)
		.then(res => {
			return res;
		})
		.catch(res => {
			return res;
		});
};

export const GetLeaveByIdService = id => {
	return MasterConfig.get(`api/Leave/GetLeaveById?id=${id}`)
		.then(res => {
			return res;
		})
		.catch(res => {
			return res;
		});
};