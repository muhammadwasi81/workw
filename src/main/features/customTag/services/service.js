import MasterConfig from "../../../../utils/services/MasterConfig";

export const getAllCustomTagByIdService = (id) => {
	return MasterConfig.get(`api/CustomTag/GetCustomTagById?id=${id}`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const getAllCustomTagService = () => {
	return MasterConfig.post(`api/CustomTag/GetAllCustomTag`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const addCustomTagService = args => {
	return MasterConfig.post(`api/CustomTag/AddCustomTag`, args)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const addCustomTagMemberService = args => {
	return MasterConfig.post(`api/CustomTag/AddCustomTagMember`, args)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const getAllCustomTagMemberService = (id) => {
	return MasterConfig.get(`api/CustomTag/GetAllCustomTagMember?id=${id}`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const updateCustomTagService = args => {
	return MasterConfig.put(`api/CustomTag/UpdateCustomTag`, args)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
export const removeCustomTagService = id => {
	return MasterConfig.delete(`api/CustomTag/RemoveCustomTag?id=${id}`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
