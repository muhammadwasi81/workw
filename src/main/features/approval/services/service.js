import { jsonToFormData } from "../../../../utils/base";
import MasterConfig from "../../../../utils/services/MasterConfig";
import {
	ResponseResultError,
	ResponseResultSuccess,
} from "../../../../utils/api/ResponseResult";
import { getAllApproval_dto } from "./dto";

export const getAllApprovalService = async (payload) => {
	console.log(payload,"payloadpayload");
	try {
		payload = getAllApproval_dto(payload);
		const {
			data: { responseCode, data, message },
		} = await MasterConfig.post(`api/Approval/GetAllApproval`, payload);
			
		if (responseCode === 1001) return ResponseResultSuccess(data);
		
		return ResponseResultError(message);
	} catch (e) {
		return ResponseResultError(e);
	}
};

