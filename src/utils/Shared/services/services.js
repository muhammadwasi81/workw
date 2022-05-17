// import AxiosConfig from "../../../utils/services/MasterConfig";
import MasterConfig from "../../../utils/services/MasterConfig";
import { createGuid } from "../../../utils/base";
const API_PREFIX = "api/Utility/";
const API_FEATURES_PREFIX = "api/BusinessFeature/";

export const getCountriesService = () => {
	return MasterConfig.get(`${API_PREFIX}GetAllCountries`)
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

	return MasterConfig.post(`${API_PREFIX}GetAllCities`, data)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getDefaultDesignationService = () => {
	return MasterConfig.get(`${API_PREFIX}GetAllDefaultDesignation`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getAllUserTypesService = () => {
	return MasterConfig.get(`${API_PREFIX}GetAllUserTypes`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getAllUserTitlesService = () => {
	return MasterConfig.get(`${API_PREFIX}GetAllUserTitles`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getAllGendersService = () => {
	return MasterConfig.get(`${API_PREFIX}GetAllGenders`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getAllMaritalStatusService = () => {
	return MasterConfig.get(`${API_PREFIX}GetAllMaritalStatus`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};
export const getAllEmployeeTypesService = () => {
	return MasterConfig.get(`${API_PREFIX}GetAllEmployeeTypes`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};
export const getAllBussinessFeaturesService = () => {
	return MasterConfig.get(`${API_FEATURES_PREFIX}GetBusinessFeatures`)
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

export const getAllRewardCategoryService = () => {
	return MasterConfig.get("api/RewardCategory/GetAllRewardCategory")
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const getAllEmployeeShortService = (pageNo=0, search="") => {
	return MasterConfig.get(`api/Employee/GetAllEmployeeShort?pageNo=${pageNo}&search=${search}`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			return err;
		});
};

export const getAllEmployeeService = () => {
	return MasterConfig.get("api/Reference/GetAllUserReference")
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
	return MasterConfig.post(
		`Upload/${withoutAuth ? "UploadFilesWithoutAuth" : "UploadFiles"}`,
		formData,
		{
			headers: { "Content-Type": "multipart/form-data" },
		}
	);
};
