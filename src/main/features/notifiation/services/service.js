// import { jsonToFormData } from "../../../../utils/base";
import MasterConfig from "../../../../utils/services/MasterConfig";
import {
	ResponseResultError,
	ResponseResultSuccess,
} from "../../../../utils/api/ResponseResult";
import { getAllNotification_dto } from "./dto";

export const getAllNotificationService = async (payload) => {
	try {
		payload = getAllNotification_dto(payload);
		const {
			data: { responseCode, data, message },
		} = await MasterConfig.post(`api/Notification/GetAllNotificationByUser`, payload);
		if (responseCode === 1001) return ResponseResultSuccess(data);
		return ResponseResultError(message);
	} catch (e) {
		return ResponseResultError(e);
	}
};