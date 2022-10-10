import { jsonToFormData } from "../../../../utils/base";
import MasterConfig from "../../../../utils/services/MasterConfig";

export const addCareerService = async(data) => {
	const formData = jsonToFormData(data);
	return MasterConfig.post(`api/Career/AddCareer`, formData)
		.then(res => {
			return res;
		})
		.catch(res => {
			return res;
		});
};