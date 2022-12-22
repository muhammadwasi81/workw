import MasterConfig from "../../../../utils/services/MasterConfig";
import {jsonToFormData} from "../../../../utils/base";

export const getELearningCategoryService = () => {
	return MasterConfig.get(`api/ELearning/GetAllCategories`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const addELearningCategoryService = args => {
	console.log("elearningcategoryyyyyyyy");
    const formData = jsonToFormData(args);
	return MasterConfig.post(`api/ELearning/AddCategory`, formData)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};
export const updateELearningCategoryService  = args => {
	const formData = jsonToFormData(args);
	return MasterConfig.put(`api/ELearning/UpdateCategory`, formData)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const removeELearningCategoryService = id => {
	return MasterConfig.delete(`api/ELearning/DeleteCategory?id=${id}`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

