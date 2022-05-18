import axios from "axios";
import { servicesUrls } from "./baseURLS";
import { getAuthToken } from "./AuthConfig";
const instance = axios.create({
	baseURL: servicesUrls.master,
	headers: {
		"Content-Type": "application/json",
	},
});
export let store;
export const injectStore = _store => {
	store = _store;
};
instance.interceptors.request.use(
	config => {
		const token = store.getState().userSlice.token;
		// console.log("token", token);
		if (token) {
			axios.defaults.headers.common["Authorization"] = "Bearer " + token;
			config.headers["Authorization"] = "Bearer " + token;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	res => {
		return res;
	},
	async err => {
		const originalConfig = err.config;

		if (originalConfig.url !== "/login" && err.response) {
			// Access Token was expired
			if (err.response.status === 401 && !originalConfig._retry) {
				let d = await getAuthToken();
				const { accessToken } = d.data.data;

				instance.defaults.headers[
					"Authorization"
				] = `Bearer ${accessToken}`;
				originalConfig._retry = true;
				return instance(originalConfig);
				// return getAuthToken().then(res => {
				// 	// console.log(res, "getAuthToken");
				// 	const { accessToken, refreshToken } = res.data.data;
				// 	store?.dispatch(
				// 		updateAccessToken({ accessToken, refreshToken })
				// 	);
				// 	instance.defaults.headers[
				// 		"Authorization"
				// 	] = `Bearer ${accessToken}`;
				// 	originalConfig._retry = true;
				// 	return instance(originalConfig);
				// });
			}
		}
		if (err.response.data === "") return Promise.reject(err);
		return err.response;
	}
);

export default instance;
