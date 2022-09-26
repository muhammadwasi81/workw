import MasterConfig from "../../../../utils/services/MasterConfig";

export const getAllBranchService = () => {
	return MasterConfig.get(`api/Branch/GetAllBranch`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const addBranchService = args => {
	return MasterConfig.post(`api/Branch/AddBranch`, args)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
export const updateBranchService = args => {
	return MasterConfig.put(`api/Branch/UpdateBranch`, args)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
export const removeBranchService = id => {
	return MasterConfig.delete(`api/Branch/RemoveBranch?id=${id}`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
