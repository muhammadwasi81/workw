import MasterConfig from "../../../../utils/services/MasterConfig";
const API_PREFIX = "/api/Group/";

export const getAllGroupService = data => {
	return MasterConfig.post(`${API_PREFIX}GetAllGroup`, data)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const addGroupService = data => {
	return MasterConfig.post(`${API_PREFIX}AddGroup`, data)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getGroupByIdService = id => {
	return MasterConfig.get(`${API_PREFIX}GetGroupById?id=${id}`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const updateGroupService = data => {
	return MasterConfig.put(`${API_PREFIX}UpdateGroup`, data)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const addGroupMemberService = data => {
	
	let id = data.id;
	let memberId = data.memberId;
	console.log(data,"dataaa");
	return MasterConfig.post(`api/Group/AddGroupMember?id=${id}`, [
		{ memberId: memberId },
	  ])
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const getAllGroupMemberService = id => {
	return MasterConfig.get(`api/Group/GetAllGroupMember?id=${id}`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
