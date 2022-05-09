import axios from "axios";
import { updateAccessToken } from "../../store/appReducer/userSlice";

export const BASE_DOMAIN = (() => {
	if (
		window.location.hostname === "konnect.lutebox.com" ||
		window.location.hostname === "www.konnect.lutebox.com"
	)
		return "http://lutebox.com";
	else if (
		window.location.hostname === "gqhub.com" ||
		window.location.hostname === "www.gqhub.com"
	)
		return "https://gqhub.com";
	else if (
		window.location.hostname === "school.gqhub.com" ||
		window.location.hostname === "www.school.gqhub.com"
	)
		return "https://gqhub.com";
	else if (
		window.location.hostname === "dev.gqhub.com" ||
		window.location.hostname === "www.dev.gqhub.com"
	)
		return "https://dev.gqhub.com";
	else if (
		window.location.hostname === "konnect.im" ||
		window.location.hostname === "www.konnect.im"
	)
		return "https://konnect.im";
	else if (
		process.env.NODE_ENV === "development" ||
		window.location.hostname === "58.65.211.234" ||
		window.location.hostname === "192.168.100.251"
	)
		// https://58.65.211.234:4436/konnectapi/
		// return "https://localhost:5001";
		return "https://58.65.211.234:4436";
	// return "https://8d90-42-201-179-182.ngrok.io/"
})();

const API_URL = BASE_DOMAIN;
const instance = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});
let store;

export const injectStore = _store => {
	store = _store;
};

instance.interceptors.request.use(
	config => {
		const token = store.getState().userSlice.token;
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

let authTokenRequest;
function getAuthToken() {
	if (!authTokenRequest) {
		authTokenRequest = instance.post(
			"/konnectauth/api/login/generaterefreshtoken",
			{
				refreshToken: store.getState().userSlice.refreshToken,
				accessToken: store.getState().userSlice.token,
			}
		);
		authTokenRequest.then(resetAuthTokenRefresh, resetAuthTokenRefresh);
	}
	return authTokenRequest;
}

function resetAuthTokenRefresh() {
	authTokenRequest = null;
}

instance.interceptors.response.use(
	res => {
		return res;
	},
	async err => {
		const originalConfig = err.config;

		if (originalConfig.url !== "/login" && err.response) {
			// Access Token was expired
			if (err.response.status === 401 && !originalConfig._retry) {
				return getAuthToken().then(res => {
					// console.log(res, "getAuthToken");
					const { accessToken, refreshToken } = res.data.data;
					store?.dispatch(
						updateAccessToken({ accessToken, refreshToken })
					);
					instance.defaults.headers[
						"Authorization"
					] = `Bearer ${accessToken}`;
					originalConfig._retry = true;
					return instance(originalConfig);
				});
			}
		}
		if (err.response.data === "") return Promise.reject(err);
		return err.response;
	}
);

export default instance;
