import moment from "moment";
import {
	ResponseResultError,
	ResponseResultSuccess,
} from "../../../../utils/api/ResponseResult";
import Config from "../../../../utils/services/MasterConfig";

const addCheckIn_dto = data => {
	return {
		attendanceDate: data.attendanceDate ? data.attendanceDate : moment(),
		userId: data.userId ? data.userId : undefined,
		lat: data.lat ? data.lat : 0,
		lng: data.lng ? data.lng : 0,
		moodId: data.moodId ? data.moodId : null,
		comment: data.comment ? data.comment : "",
		type: data.type ? data.type : 1,
	};
};

export const AddAttendanceCheckInService = async (payload = {}) => {
	let request = addCheckIn_dto(payload);
	try {
		const {
			data: { responseCode, data, message },
		} = await Config.post(`api/Attendance/AddAttendanceCheckIn`, request);
		if (responseCode === 1001) return ResponseResultSuccess(data);
		return ResponseResultError(message);
	} catch (e) {
		return ResponseResultError(e);
	}
};

export const GetAttendanceLastCheckInService = async () => {
	try {
		const {
			data: { responseCode, data, message },
		} = await Config.get(`api/Attendance/GetAttendanceLastCheckIn`);
		if (responseCode === 1001) return ResponseResultSuccess(data);
		return ResponseResultError(message);
	} catch (e) {
		return ResponseResultError(e);
	}
};
