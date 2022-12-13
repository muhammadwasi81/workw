export const servicesUrls = { master: '', messenger: '', auth: '', mail: '' };
// export const buildType = 'LIVE';
export const buildType = 'LOCAL';
export const MASTER_URL = (() => {
<<<<<<< HEAD
  if (buildType === 'LIVE') {
    servicesUrls.auth = 'https://workw.com/authapi/';
    servicesUrls.messenger = 'https://workw.com/messengerapi/';
    servicesUrls.master = 'https://workw.com/workwapi/';
    servicesUrls.mail = 'https://workw.com/mailapi/';
  } else {
    servicesUrls.auth = 'https://58.65.211.234:4436/konnectauth/';
    servicesUrls.messenger = 'https://58.65.211.234:4436/KonnectMessenger/';
    servicesUrls.master = 'https://58.65.211.234:4436/konnectapi/';
    servicesUrls.mail = 'https://58.65.211.234:4436/konnectmail/';
=======
  if (buildType === "LIVE") {
    servicesUrls.auth = "https://workw.com/authapi/";
    servicesUrls.messenger = "https://workw.com/messengerapi/";
    servicesUrls.master = "https://workw.com/workwapi/";
    servicesUrls.mail = "https://workw.com/mailapi/";
  } else {
    servicesUrls.auth = "https://58.65.211.234:4436/konnectauth/";
    servicesUrls.messenger = "https://58.65.211.234:4436/KonnectMessenger/";
    servicesUrls.master = "https://58.65.211.234:4436/konnectapi/";
    servicesUrls.mail = "https://58.65.211.234:4436/konnectmail/";
>>>>>>> f7027313811199d168d2abcfe53dd23a1f444d9e
  }
})();
