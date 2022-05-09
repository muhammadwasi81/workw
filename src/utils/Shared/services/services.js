import AxiosConfig from "../../../utils/services/AxiosConfig";
import { createGuid } from "../../../utils/base";
const API_PREFIX = "konnectapi/api/Utility/";
const API_FEATURES_PREFIX = "konnectapi/api/BusinessFeature/";

export const getCountriesService = () => {
	return AxiosConfig.get(`${API_PREFIX}GetAllCountries`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getCitiesService = obj => {
	const data = {
		search: obj.textData,
		pageNo: obj.page,
	};

	return AxiosConfig.post(`${API_PREFIX}GetAllCities`, data)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getDefaultDesignationService = () => {
	return AxiosConfig.get(`${API_PREFIX}GetAllDefaultDesignation`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getAllUserTypesService = () => {
	return AxiosConfig.get(`${API_PREFIX}GetAllUserTypes`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getAllUserTitlesService = () => {
	return AxiosConfig.get(`${API_PREFIX}GetAllUserTitles`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getAllGendersService = () => {
	return AxiosConfig.get(`${API_PREFIX}GetAllGenders`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getAllMaritalStatusService = () => {
	return AxiosConfig.get(`${API_PREFIX}GetAllMaritalStatus`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};
export const getAllEmployeeTypesService = () => {
	return AxiosConfig.get(`${API_PREFIX}GetAllEmployeeTypes`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};
export const getAllBussinessFeaturesService = () => {
	return AxiosConfig.get(`${API_FEATURES_PREFIX}GetBusinessFeatures`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getAllRewardCategoryService = () => {
	return AxiosConfig.get(
		"https://58.65.211.234:4436/konnectapi/api/RewardCategory/GetAllRewardCategory"
	)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};



export const uploadImageService = files => {
	const formData = new FormData();
	let withoutAuth = false;
	for (let i = 0; i < files.length; i++) {
		formData.append(`files[${i}].id`, createGuid());
		if (files[i].originFileObj) {
			formData.append(`files[${i}].file`, files[i].originFileObj);
		} else {
			withoutAuth = true;
			formData.append(`files[${i}].file`, files[i]);
		}
	}
	return AxiosConfig.post(
		`konnectupload/api/Upload/${
			withoutAuth ? "UploadFilesWithoutAuth" : "UploadFiles"
		}`,
		formData,
		{
			headers: { "Content-Type": "multipart/form-data" },
		}
	);
};
