import MasterConfig from "../../../../utils/services/MasterConfig";

export const getAllFiscalYearService = () => {
	return MasterConfig.get(`api/FiscalYear/GetAllFiscalYear`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const addFiscalYearService = args => {
	return MasterConfig.post(`api/FiscalYear/AddFiscalYear`, args)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
export const updateFiscalYearService = args => {
	return MasterConfig.put(`api/FiscalYear/UpdateFiscalYear`, args)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
export const removeFiscalYearService = id => {
	return MasterConfig.delete(`api/FiscalYear/RemoveFiscalYear?id=${id}`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
