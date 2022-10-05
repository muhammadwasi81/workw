import MasterConfig from "../../../../utils/services/MasterConfig";

export const getAllBranchOfficeService = () => {
	return MasterConfig.get(`api/BranchOffice/GetAllBranchOffice`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const addbranchOfficeService = args => {
	return MasterConfig.post(`api/BranchOffice/AddBranchOffice`, args)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
export const updateBranchService = args => {
	return MasterConfig.put(`api/BranchOffice/UpdateBranchOffice`, args)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
export const removeBranchOfficeService = id => {
	return MasterConfig.delete(`api/BranchOffice/RemoveBranchOffice?id=${id}`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
