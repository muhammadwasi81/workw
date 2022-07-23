export const servicesUrls = { master: "", messenger: "", auth: "", mail: "" };
// export const buildType = "LIVE";
export const buildType = "LOCAL";
export const MASTER_URL = (() => {
	if (buildType === "LIVE") {
		servicesUrls.auth = "https://workw.com/auth/";
		servicesUrls.messenger = "https://workw.com/messenger/";
		servicesUrls.master = "https://workw.com/api/";
		servicesUrls.mail = "https://workw.com/mail/";
	} else {
		servicesUrls.auth = "https://58.65.211.234:4436/konnectauth/";
		servicesUrls.messenger = "https://58.65.211.234:4436/KonnectMessenger/";
		servicesUrls.master = "https://58.65.211.234:4436/konnectapi/";
		servicesUrls.mail = "https://58.65.211.234:4436/konnectmail/";
	}
})();
