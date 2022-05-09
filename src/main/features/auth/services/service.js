import { createGuid } from "../../../../utils/base";
import AxiosConfig from "../../../../utils/services/AxiosConfig";

export const loginService = data => {
	return AxiosConfig.post("konnectauth/api/login", data)
		.then(res => {
			return res;
		})
		.catch(error => {
			return error;
		});
};

export const signupService = data => {
	return AxiosConfig.post("konnectauth/api/Signup/BusinessSignup", data)
		.then(res => {
			return res;
		})
		.catch(error => {
			return error;
		});
};

export const emailVerificationService = data => {
	return AxiosConfig.get(`konnectapi/api/Signup/VerifySignup?token=${data}`);
};

export const getDesignationService = () => {
	return AxiosConfig.get("konnectapi/api/Utility/GetAllDefaultDesignation")
		.then(res => {
			return res.data;
		})
		.catch(error => {
			return error;
		});
};

// export const uploadImageService = (files) => {
//   const formData = new FormData();
//   for (let i = 0; i < files.length; i++) {
//     formData.append(`files[${i}].id`, createGuid());
//     formData.append(`files[${i}].file`, files[i]);
//     console.log(files[i]);
//   }
//   return AxiosConfig.post(
//     "konnectupload/api/Upload/UploadFilesWithoutAuth",
//     formData,
//     {
//       headers: { "Content-Type": "multipart/form-data" },
//     }
//   );
// };
