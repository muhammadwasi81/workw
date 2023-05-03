import { servicesUrls } from "../../../../utils/services/baseURLS";
import MasterConfig from "../../../../utils/services/MasterConfig";
// const LocalCallingUrl = "192.168.100.70:3300";
const LiveCallingUrl = servicesUrls.callingSocket
// const LiveCallingUrl = "192.168.86.29:3300";

export const createRoomService = data => {
	return MasterConfig.post(
		`${LiveCallingUrl}api/createroomlink
    `,
		data
	)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const instantCallService = data => {
	console.log("instant call data", data);
	return MasterConfig.post(
		`${LiveCallingUrl}api/createroomlink
    `,
		data
	)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const addDeviceService = data => {
	return MasterConfig.post(`api/device/addDevice`, data)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};