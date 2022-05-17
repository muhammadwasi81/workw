// import AxiosConfig from "../../../../utils/services/AxiosConfig";
// const API_PREFIX = "KonnectMessenger/api/Messenger/";
import MasterConfig from "../../../../utils/services/MasterConfig";

export const getAllChatsService = () => {
	return MasterConfig.get(`api/Messenger/getAllChats`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const addGradeService = args => {
	return MasterConfig.post(`api/Messenger/addgrade`, args)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
