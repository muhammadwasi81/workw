import MasterConfig from "../../../../utils/services/MasterConfig";
export const createRoomService = data => {
	return MasterConfig.post(
		`https://192.168.18.11:3300/api/createroomlink
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
