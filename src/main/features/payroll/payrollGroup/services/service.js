import MasterConfig from "../../../../../utils/services/MasterConfig";

export const getAllPayrollGroupService = () => {
	return MasterConfig.get(`api/PayrollGroup/GetAllPayrollGroup`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const addPayrollGroupService = args => {
	return MasterConfig.post(`api/PayrollGroup/AddPayrollGroup`, args)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
export const updatePayrollGroupService = args => {
	return MasterConfig.put(`api/PayrollGroup/updatePayrollGroup`, args)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
export const removePayrollGroupService = id => {
	return MasterConfig.delete(`api/PayrollGroup/removePayrollGroup?id=${id}`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
