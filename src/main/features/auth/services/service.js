import { createGuid } from "../../../../utils/base";
import AuthConfig from "../../../../utils/services/AuthConfig";

export const loginService = data => {
	return AuthConfig.post("api/login", data)
		.then(res => {
			return res;
		})
		.catch(error => {
			return error;
		});
};

export const signupService = data => {
	return AuthConfig.post("konnectauth/api/Signup/BusinessSignup", data)
		.then(res => {
			return res;
		})
		.catch(error => {
			return error;
		});
};

export const emailVerificationService = data => {
	return AuthConfig.get(`konnectapi/api/Signup/VerifySignup?token=${data}`);
};

// export const getDesignationService = () => {
// 	return AuthConfig.get("konnectapi/api/Utility/GetAllDefaultDesignation")
// 		.then(res => {
// 			return res.data;
// 		})
// 		.catch(error => {
// 			return error;
// 		});
// };

// import { createGuid } from "../../../../utils/base";
// import AxiosConfig from "../../../../utils/services/AxiosConfig";

// export const loginService = data => {
// 	return AxiosConfig.post("konnectauth/api/login", data)
// 		.then(res => {
// 			return res;
// 		})
// 		.catch(error => {
// 			return error;
// 		});
// };

// export const signupService = data => {
// 	return AxiosConfig.post("konnectauth/api/Signup/BusinessSignup", data)
// 		.then(res => {
// 			return res;
// 		})
// 		.catch(error => {
// 			return error;
// 		});
// };

// export const emailVerificationService = data => {
// 	return AxiosConfig.get(`konnectapi/api/Signup/VerifySignup?token=${data}`);
// };

// export const getDesignationService = () => {
// 	return AxiosConfig.get("konnectapi/api/Utility/GetAllDefaultDesignation")
// 		.then(res => {
// 			return res.data;
// 		})
// 		.catch(error => {
// 			return error;
// 		});
// };
