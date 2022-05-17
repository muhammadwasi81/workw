export const servicesUrls = { master: "", messenger: "", auth: "", mail: "" };
export const MASTER_URL = (() => {
	if (
		window.location.hostname === "konnect.im" ||
		window.location.hostname === "www.konnect.im"
	) {
		servicesUrls.auth = "https://58.65.211.234:4436/konnectauth/";
		servicesUrls.messenger = "https://58.65.211.234:4436/KonnectMessenger/";
		servicesUrls.master = "https://58.65.211.234:4436/konnectapi/";
		servicesUrls.mail = "https://58.65.211.234:4436/konnectmail/";
	} else if (
		process.env.NODE_ENV === "development" ||
		window.location.hostname === "58.65.211.234" ||
		window.location.hostname === "192.168.100.251"
	) {
		servicesUrls.auth = "https://58.65.211.234:4436/konnectauth/";
		servicesUrls.messenger = "https://58.65.211.234:4436/KonnectMessenger/";
		servicesUrls.master = "https://58.65.211.234:4436/konnectapi/";
		servicesUrls.mail = "https://58.65.211.234:4436/konnectmail/";
	} else {
		servicesUrls.auth = "https://58.65.211.234:4436/konnectauth/";
		servicesUrls.messenger = "https://58.65.211.234:4436/KonnectMessenger/";
		servicesUrls.master = "https://58.65.211.234:4436/konnectapi/";
		servicesUrls.mail = "https://58.65.211.234:4436/konnectmail/";
	}
	else{
		servicesUrls.auth = "https://58.65.211.234:4436/konnectauth/";
		servicesUrls.messenger = "https://58.65.211.234:4436/KonnectMessenger/";
		servicesUrls.master = "https://58.65.211.234:4436/konnectapi/";
		servicesUrls.mail = "https://58.65.211.234:4436/konnectmail/";
	}
})();
