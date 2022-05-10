import axios from "axios";
import { updateAccessToken } from "../../store/appReducer/userSlice";
import { servicesUrls } from "./baseURLS";

const instance = axios.create({
	baseURL: servicesUrls.auth,
	headers: {
		"Content-Type": "application/json",
	},
});
export let store;
let authTokenRequest;
export const injectStore = _store => {
	store = _store;
};

instance.interceptors.request.use(
	config => {
		// const token = store.getState().userSlice.token;
		// if (token) {
		// 	axios.defaults.headers.common["Authorization"] = "Bearer " + token;
		// 	config.headers["Authorization"] = "Bearer " + token;
		// }
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
			// 	if (err.response.status === 401 && !originalConfig._retry) {
			// 		return getAuthToken().then(res => {
			// 			// console.log(res, "getAuthToken");
			// 			const { accessToken, refreshToken } = res.data.data;
			// 			store?.dispatch(
			// 				updateAccessToken({ accessToken, refreshToken })
			// 			);
			// 			instance.defaults.headers[
			// 				"Authorization"
			// 			] = `Bearer ${accessToken}`;
			// 			originalConfig._retry = true;
			// 			return instance(originalConfig);
			// 		});
			// 	}
		}
		if (err.response.data === "") return Promise.reject(err);
		return err.response;
	}
);

export function getAuthToken() {
	if (!authTokenRequest) {
		authTokenRequest = instance.post("/api/login/generaterefreshtoken", {
			refreshToken: store.getState().userSlice.refreshToken,
			accessToken: store.getState().userSlice.token,
		});

		authTokenRequest.then(res => {
			const { accessToken, refreshToken } = res.data.data;
			store?.dispatch(updateAccessToken({ accessToken, refreshToken }));
			resetAuthTokenRefresh();
		});
	}
	return authTokenRequest;
}

function resetAuthTokenRefresh() {
	authTokenRequest = null;
}

export default instance;
