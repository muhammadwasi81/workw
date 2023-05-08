// import { createGuid } from "../../../../utils/base";
import { jsonToFormData } from "../../../../utils/base";
import AuthConfig from "../../../../utils/services/AuthConfig";
import MasterConfig from "../../../../utils/services/MasterConfig";

export const loginService = (data) => {
  return AuthConfig.post("api/login", data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const signupService = (data) => {
  const formData = jsonToFormData(data);
  return MasterConfig.post("api/Signup/Signup", formData)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export const emailVerificationService = (data) => {
  return MasterConfig.get(`api/Signup/VerifySignupEmailToken?token=${data}`);
};

export const setNewPasswordService = (data) => {
  let token = data.token;
  let password = data.password;
  return MasterConfig.get(
    `api/User/ChangePasswordByToken?token=${token}&password=${password}`
  );
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
// 	return AxiosConfig.post("api/login", data)
// 		.then(res => {
// 			return res;
// 		})
// 		.catch(error => {
// 			return error;
// 		});
// };

// export const signupService = data => {
// 	return AxiosConfig.post("api/Signup/BusinessSignup", data)
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
export const forgotPassword = (data) => {
  console.log(data, "datttta");
  return MasterConfig.post(`api/User/ForgotPassword?email=${data}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

// export const forgotPasswordTokenService = (tokenData) => {
//   console.log(tokenData, "datttta");

//   return MasterConfig.get(`api/User/VerifyToken?token=${tokenData}`)
//     .then((res) => {
//       return res;
//     })
//     .catch((error) => {
//       return error;
//     });
// };
