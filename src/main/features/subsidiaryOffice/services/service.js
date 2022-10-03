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
	return MasterConfig.post(`api/BranchOffice/AddBranchOffice`, {
		id: "a46a5d1e-ce2d-4e60-868e-c7461d109a71",
		branchId: "b2078de1-a1ed-4aea-a959-7a9ef030f7f7",
		name: "Salman",
		address: "string",
		lat: 0,
		lng: 0,
		isDefault: true
	})
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
