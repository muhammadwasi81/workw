import MasterConfig from "../../../../utils/services/MasterConfig";

export const getAllTaxSlabService = () => {
	return MasterConfig.get(`api/TaxSlab/GetAllTaxSlab`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const addTaxSlabService = args => {
	return MasterConfig.post(`api/TaxSlab/AddTaxSlab`, args)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
export const updateTaxSlabService = args => {
	return MasterConfig.put(`api/TaxSlab/UpdateTaxSlab`, args)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
export const removeTaxSlabService = id => {
	return MasterConfig.delete(`api/TaxSlab/RemoveTaxSlab?id=${id}`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
