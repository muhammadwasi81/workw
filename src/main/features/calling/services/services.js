import MasterConfig from "../../../../utils/services/MasterConfig";
// const LocalCallingUrl = "192.168.100.70:3300";
const LiveCallingUrl = "call.workw.com";

export const createRoomService = data => {
	return MasterConfig.post(
		`https://${LiveCallingUrl}/api/createroomlink
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
		`https://${LiveCallingUrl}/api/createroomlink
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
	return MasterConfig.post(`api/User/addDevice`, data)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};