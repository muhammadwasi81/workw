import MasterConfig from "../../../../utils/services/MasterConfig";

export const getAllTaxSlabService = (payload) => {
	return MasterConfig.post(`api/TaxSlab/GetAllTaxSlabGroup`, payload)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const addTaxSlabService = args => {
	return MasterConfig.post(`api/TaxSlab/AddTaxSlabGroup`, args)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
export const getTaxSlabGroupById = id => {
	return MasterConfig.get(`api/TaxSlab/GetTaxSlabGroupById?id=${id}`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
