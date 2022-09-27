import MasterConfig from "../../../../utils/services/MasterConfig";
const API_PREFIX = "api/Approval/";

export const getApprovalService = id => {
	return MasterConfig.get(`${API_PREFIX}GetApproval&id=${id}`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};
