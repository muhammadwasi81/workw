import MasterConfig from "../../../../utils/services/MasterConfig";
export const createRoomService = data => {
	return MasterConfig.post(
		`https://call.workw.com/api/createroomlink
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
