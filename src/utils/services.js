import $ from "jquery";
import { createGuid, STRINGS } from "./base";

window.jQuery = $;
require("ms-signalr-client-jquery-3");

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
		return "https://konnect.im";
})();
const API_URL = BASE_DOMAIN + "/KonnectApiv3/api";
const SOCKET_URL = BASE_DOMAIN + "/KonnectApiv3";
export let REPORT_URL = BASE_DOMAIN + "/konnectapiv3/reports";
export const SOCKET_CONNECTION = $.hubConnection(`${SOCKET_URL}/signalr/hubs`);
export const CHAT_PROXY = SOCKET_CONNECTION.createHubProxy("chatHub");
export const GENERAL_PROXY = SOCKET_CONNECTION.createHubProxy("generalHub");

export const API = {
	SEARCH: {
		getAllSearch: obj =>
			$.ajax({
				url: `${API_URL}/search/getAllSearch`,
				method: "POST",
				data: JSON.stringify(obj),

				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
	},
	E_LEARNING: {
		AddClassroom: obj =>
			$.ajax({
				url: `${API_URL}/ELearning/AddClassroom`,
				method: "POST",
				data: JSON.stringify(obj),

				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		GetAllClassroom: (obj = {}) =>
			$.ajax({
				url: `${API_URL}/ELearning/GetAllClassroom`,
				method: "POST",
				data: JSON.stringify(obj),

				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),

		getCategory: id =>
			$.ajax({
				url: `${API_URL}/eLearning/GetCategory?id=${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getQuizAttemptedStatus: id =>
			$.ajax({
				url: `${API_URL}/ELearning/CheckQuizAttempted?id=${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		startQuiz: id =>
			$.ajax({
				url: `${API_URL}/ELearning/StartQuiz?id=${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllCategory: obj =>
			$.ajax({
				url: `${API_URL}/eLearning/GetAllCategory`,
				method: "POST",
				data: JSON.stringify(obj),

				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		create: data =>
			$.ajax({
				url: `${API_URL}/eLearning/AddCategory`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		creatQuiz: data =>
			$.ajax({
				url: `${API_URL}/ELearning/AddQuiz`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllQuiz: obj =>
			$.ajax({
				url: `${API_URL}/eLearning/GetAllQuiz`,
				method: "POST",
				data: JSON.stringify(obj),

				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getQuizDetail: id =>
			$.ajax({
				url: `${API_URL}/ELearning/GetQuiz?id=${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getQuizResult: id =>
			$.ajax({
				url: `${API_URL}/ELearning/QuizResult?id=${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addCourse: data =>
			$.ajax({
				url: `${API_URL}/ELearning/AddCourse`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addAssignQuizUser: data =>
			$.ajax({
				url: `${API_URL}/ELearning/AddAssignQuiz`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllCourse: obj =>
			$.ajax({
				url: `${API_URL}/ELearning/GetAllCourse`,
				method: "POST",
				data: JSON.stringify(obj),

				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		attemptTopic: id =>
			$.ajax({
				url: `${API_URL}/ELearning/AttemptTopic?id=${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		attemptAnswer: ({ quiz_id, question_id, answer_id }) =>
			$.ajax({
				url: `${API_URL}/ELearning/QuizAttemptAnswer?id=${quiz_id}&question_id=${question_id}&answer_id=${answer_id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getCourseById: id =>
			$.ajax({
				url: `${API_URL}/ELearning/GetCourse?id=${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllCurriculum: id =>
			$.ajax({
				url: `${API_URL}/ELearning/GetAllCurriculum?id=${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getMileboardLink: id =>
			$.ajax({
				url: `${API_URL}/Calling/GetMileboardLink?id=${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
	},
	GENERAL: {
		getCities: (q, p, id) =>
			$.ajax({
				url: `${API_URL}/Util/GetAllCity?q=${q}&page=${p}&country_id=${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getCountries: (q, p) =>
			$.ajax({
				url: `${API_URL}/Util/GetAllCountry`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllReferences: data =>
			$.ajax({
				url: `${API_URL}/util/getallreference`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
	},
	FILES: {
		upload: (files, token, idList = []) => {
			const formData = new FormData();
			for (let i = 0; i < files.length; i++) {
				//let f=idList[i];
				let id;
				if (files[i].custom_id === undefined) id = createGuid();
				else id = files[i].custom_id;
				formData.append(id, files[i]);
				/*if (idList.length !== 0) {
                    formData.append(idList[i], files[i])
                } else {
                    formData.append('file' + i, files[i])
                }*/
			}
			return $.ajax({
				url: `${API_URL}/upload`,
				type: "POST",
				cache: false,
				async: true,
				contentType: false,
				processData: false,
				data: formData,
				headers: {
					token:
						token !== undefined
							? token
							: localStorage.getItem(STRINGS.STORAGE.token),
				},
			});
		},
	},
	CALL: {
		doCall: data =>
			$.ajax({
				url: `${API_URL}/calling/addcalling`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		joinCallRoom: data =>
			$.ajax({
				url: `${API_URL}/calling/joinroomrequest`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getCall: id =>
			$.ajax({
				url: `${API_URL}/calling/getcalling?id=${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getCallLink: id =>
			$.ajax({
				url: `${API_URL}/calling/getcallinglink?id=${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		verifyCallingInvitation: (id, t) =>
			$.ajax({
				url: `${API_URL}/calling/checkcallinginvitation?id=${id}&t=${t}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
	},
	NOTIFICATION: {
		getAll: page =>
			$.ajax({
				url: `${API_URL}/Notification/GetAll?page=${page}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getUserDetail: () =>
			$.ajax({
				url: `${API_URL}/User/GetUserDetails`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		readNotification: id =>
			$.ajax({
				url: `${API_URL}/Notification/Read/${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		readAllNotification: () =>
			$.ajax({
				url: `${API_URL}/Notification/ReadAll`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
	},
	AUTH: {
		login: data =>
			$.ajax({
				method: "POST",
				url: `${API_URL}/user/login`,
				data: data,
			}),
		signup: data =>
			$.ajax({
				method: "POST",
				url: `${API_URL}/Business/SignupBusiness`,
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
				},
			}),
		anonymousLogin: token =>
			$.ajax({
				url: `${API_URL}/Business/verificationBusiness/${token}`,
				method: "GET",
			}),
		forgotPassword: data =>
			$.ajax({
				url: `${API_URL}/User/ForgotPassword`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		forgotPasswordGet: data =>
			$.ajax({
				url: `${API_URL}/User/ForgotPasswordGet?id=${data}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		changePassword: data =>
			$.ajax({
				url: `${API_URL}/User/ChangePassword`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					// 'token': localStorage.getItem(STRINGS.STORAGE.token)
				},
			}),
		externalSignUp: data =>
			$.ajax({
				url: `${API_URL}/Signup/ExternalSignup`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
				},
			}),
		signUpFormValidation: id =>
			$.ajax({
				url: `${API_URL}/Signup/VerifyInvitation?id=${id}`,
				method: "GET",
			}),
	},
	POSTS: {
		getPostsById: id =>
			$.ajax({
				url: `${API_URL}/Feed/FeedGetBy_id/${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		create: data =>
			$.ajax({
				url: `${API_URL}/feed/createfeed`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getPosts: data =>
			$.ajax({
				url: `${API_URL}/feed/feedgetall`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addReaction: data =>
			$.ajax({
				url: `${API_URL}/Reaction/AddReaction`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllReaction: data =>
			$.ajax({
				url: `${API_URL}/Reaction/GetAllReaction?id=${data.id}&type=${data.type}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addPostReaction: data =>
			$.ajax({
				url: `${API_URL}/feed/addfeedreaction`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		removePostReaction: feedId =>
			$.ajax({
				url: `${API_URL}/feed/removefeedreaction/${feedId}`,
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		markPinnedPost: (feed_id, status = 0) =>
			$.ajax({
				url: `${API_URL}/feed/MarkFeedPinned`,
				method: "POST",
				data: JSON.stringify({ feed_id, status }),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getPoll: id =>
			$.ajax({
				url: `${API_URL}/Feed/GetAllFeedPollResponse?id=${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addPostCommentReaction: (comment_id, reactionType = 1) =>
			$.ajax({
				url: `${API_URL}/feed/addfeedcommentreaction`,
				method: "POST",
				data: JSON.stringify({ comment_id, reactionType }),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		removePostCommentReaction: commentId =>
			$.ajax({
				url: `${API_URL}/feed/removecommentreaction/${commentId}`,
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addComment: data =>
			$.ajax({
				url: `${API_URL}/feed/addcomment`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addPollReaction: data =>
			$.ajax({
				url: `${API_URL}/feed/addpollresponse`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getComments: data =>
			$.ajax({
				url: `${API_URL}/feed/getcomments?feed_id=${data.feed_id}&parent_id=${data.comment_id}&page=${data.page}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
	},
	CHAT: {
		getChats: (page, search) =>
			$.ajax({
				url: `${API_URL}/chatv1/getallconversation?page=${page}&search=${search}`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllChats: data =>
			$.ajax({
				url: `${API_URL}/chatv1/getallconversation`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getChatById: chat_id =>
			$.ajax({
				url: `${API_URL}/chatv1/getchat?chat_id=${chat_id}`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getMessages: (data, page) =>
			$.ajax({
				url: `${SOCKET_URL}/api/chatv1/getallmessages?page=${page}`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		sendMessage: data =>
			$.ajax({
				url: `${SOCKET_URL}/api/chatv1/sendmessage`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		createGroupChat: data =>
			$.ajax({
				url: `${SOCKET_URL}/api/chatv1/creategroup`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
	},
	EMAIL: {
		getInbox: data =>
			$.ajax({
				url: `${API_URL}/Email/GetAllEmail`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getFolderById: (folderId = "INBOX", page = 1) =>
			$.ajax({
				url: `${API_URL}/Email/GetAllEmail?page=${page}&folder=${folderId}`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getBody: (id, folder = "INBOX") =>
			$.ajax({
				url: `${API_URL}/Email/GetMessage?id=${id}&folder=${folder}`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		sendMessage: data =>
			$.ajax({
				url: `${API_URL}/Email/SendMessage`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
	},
	USERS: {
		SaveEmployeeLeave: data =>
			$.ajax({
				method: "POST",
				url: `${API_URL}/HREmployee/SaveEmployeeLeave`,
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		NotificationCounterUpdate: data =>
			$.ajax({
				method: "POST",
				url: `${API_URL}/User/NotificationCounterUpdate`,
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllActivityLogs: data =>
			$.ajax({
				url: `${API_URL}/User/GetAllActivityLog`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),

		all: (q = "", a = 1, d = 0, p = 0) =>
			$.ajax({
				url: `${API_URL}/User/GetAll?search=${q}&page=${p}&is_active=${a}&isDisable=${d}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		byId: id =>
			$.ajax({
				url: `${API_URL}/User/GetUserProfile/${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		add: data =>
			$.ajax({
				url: `${API_URL}/hremployee/AddEmployee`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addEmployeeLeave: data =>
			$.ajax({
				url: `${API_URL}/hremployee/AddEmployeeLeave`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllEmployeeLeave: id =>
			$.ajax({
				url: `${API_URL}/hremployee/GetAllEmployeeLeave?id=${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		checkNewUser: () =>
			$.ajax({
				url: `${API_URL}/User/CheckForShowQuickSetup`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		dontShowAgainBasicSetup: () =>
			$.ajax({
				url: `${API_URL}/User/DontShowQuickSetup`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		updateEmployee: data =>
			$.ajax({
				url: `${API_URL}/HREmployee/UpdateEmployee`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		userRightsUpdate: data =>
			$.ajax({
				url: `${API_URL}/User/UserRightsUpdate`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		enableDisable: data =>
			$.ajax({
				url: `${API_URL}/user/UpdateDisableStatus`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		createlevel: data =>
			$.ajax({
				url: `${API_URL}/level/AddLevelGroup`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		updatelevel: data =>
			$.ajax({
				url: `${API_URL}/level/updateLevelGroup`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		GetLevelGroup: id =>
			$.ajax({
				url: `${API_URL}/level/GetLevelGroup?id=${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),

		UpdateUserRating: rate =>
			$.ajax({
				url: `${API_URL}/HREmployee/UpdateUserRating`,
				type: "POST",
				data: JSON.stringify(rate),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllCounter: () =>
			$.ajax({
				url: `${API_URL}/User/GetUserDetails`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		updateUserAbout: value =>
			$.ajax({
				url: `${API_URL}/HREmployee/UpdateAbout`,
				type: "POST",
				data: JSON.stringify(value),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllHrReferences: () =>
			$.ajax({
				url: `${API_URL}/HR/GetAllHR_Reference`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		sendWelcomeEmail: id =>
			$.ajax({
				url: `${API_URL}/HREmployee/SendWelcomeEmail?id=${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		sendForgotPasswordEmail: id =>
			$.ajax({
				url: `${API_URL}/HREmployee/SendForgotPasswordEmail?id=${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
	},
	GROUPS: {
		editGroup: data =>
			$.ajax({
				url: `${API_URL}/group/UpdateGroup`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		create: data =>
			$.ajax({
				url: `${API_URL}/group/creategroup`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getGroups: (page, query = "") =>
			$.ajax({
				url: `${API_URL}/group/getall?page=${page}&search=${query}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getGroupId: id =>
			$.ajax({
				url: `${API_URL}/group/getgroupby_id/${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addMembersInGroup: data =>
			$.ajax({
				url: `${API_URL}/Group/SaveGroupMember`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		deleteMembersFromGroup: data =>
			$.ajax({
				url: `${API_URL}/group/groupmemberdelete`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
	},
	Event: {
		getEvent: () =>
			$.ajax({
				url: `${API_URL}/User/GetAllEvent`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
	},
	PROJECTS: {
		addExternalUser: obj =>
			$.ajax({
				url: `${API_URL}/Project/AddProjectExternal`,
				type: "POST",
				data: JSON.stringify(obj),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		editProject: data =>
			$.ajax({
				url: `${API_URL}/project/UpdateProject`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		create: data =>
			$.ajax({
				url: `${API_URL}/project/addproject`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getProjects: (p, q = "") =>
			$.ajax({
				url: `${API_URL}/project/getallproject?search${q}=&page=${p}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getProjectId: id =>
			$.ajax({
				url: `${API_URL}/project/getprojectby_id/${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addMembersInProject: data =>
			$.ajax({
				url: `${API_URL}/Project/SaveProjectMember`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		deleteMembersFromProject: data =>
			$.ajax({
				url: `${API_URL}/project/deletemember`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllBudgets: data =>
			$.ajax({
				url: `${API_URL}/Project/GetAllProjectBudget`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addProjectBudget: data =>
			$.ajax({
				url: `${API_URL}/Project/AddProjectBudget`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllProjectSummary: id =>
			$.ajax({
				url: `${API_URL}/project/GetProjectSummary?id=${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		updateProjectSummary: data =>
			$.ajax({
				url: `${API_URL}/Project/UpdateProjectSummary`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getProjectSummary: data =>
			$.ajax({
				url: `${API_URL}/Project/getProjectSummary`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
	},
	PAYROLL: {
		getAllPayroll: () =>
			$.ajax({
				url: `${API_URL}/HR_EmployeeSalary/getcalculated_hr_employee_salary`,
				type: "GET",
				// data: JSON.stringify(obj),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getPayroll: obj =>
			$.ajax({
				url: `${API_URL}/payroll/GetAllPayrollMaster`,
				type: "POST",
				data: JSON.stringify(obj),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		createPayRoll: obj =>
			$.ajax({
				url: `${API_URL}/payroll/AddPayroll`,
				type: "POST",
				data: JSON.stringify(obj),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
	},
	INVENTORY: {
		getInventory: data =>
			$.ajax({
				url: `${API_URL}/Inventory/GetAllInventory`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addInventory: data =>
			$.ajax({
				url: `${API_URL}/Inventory/AddInventory`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		createCategory: data =>
			$.ajax({
				url: `${API_URL}/Inventory/AddItemCategory`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getCategory: () =>
			$.ajax({
				url: `${API_URL}/Inventory/GetAllItemCategory`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addItem: data =>
			$.ajax({
				url: `${API_URL}/Inventory/AddItem`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getItem: data =>
			$.ajax({
				url: `${API_URL}/Inventory/GetAllItem`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
	},
	TASKS: {
		create: data =>
			$.ajax({
				url: `${API_URL}/task/addtask`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getTasks: data =>
			$.ajax({
				url: `${API_URL}/task/getalltask`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getTask: id =>
			$.ajax({
				url: `${API_URL}/task/gettask/${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		updateProgress: data =>
			$.ajax({
				url: `${API_URL}/task/updatetaskprogress`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		updateTaskRating: data =>
			$.ajax({
				url: `${API_URL}/Task/UpdateTaskRating`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		updateIndividualTaskRating: data =>
			$.ajax({
				url: `${API_URL}/Task/UpdateTaskMemberRating`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		updateTaskStatus: data =>
			$.ajax({
				url: `${API_URL}/Task/UpdateTaskStatus`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		comments: {
			/*addComment: data => $.ajax({
                url: `${API_URL}/task/addcomment`,
                method: 'POST',
                data: JSON.stringify(data),
                headers: {
                    'MainRightBody-Type': 'application/json',
                    'token': localStorage.getItem(STRINGS.STORAGE.token)
                }
            }),*/
			addComment: data =>
				$.ajax({
					url: `${API_URL}/Comment/AddComment`,
					method: "POST",
					data: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json",
						token: localStorage.getItem(STRINGS.STORAGE.token),
					},
				}),

			/*getAllComments: data => $.ajax({
                url: `${API_URL}/task/getcomments?task_id=${data.id}&page=${data.page}&parent_id=${data.parentId}`,
                method: 'GET',
                headers: {
                    'MainRightBody-Type': 'application/json',
                    'token': localStorage.getItem(STRINGS.STORAGE.token)
                }
            }),*/
			getAllComments: data =>
				$.ajax({
					url: `${API_URL}/Comment/GetAllComment`,
					method: "POST",
					data: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json",
						token: localStorage.getItem(STRINGS.STORAGE.token),
					},
				}),
			addReaction: (reference_id, reactionType = 1) =>
				$.ajax({
					url: `${API_URL}/Task/AddCommentReaction`,
					method: "POST",
					data: JSON.stringify({ reference_id, reactionType }),
					headers: {
						"Content-Type": "application/json",
						token: localStorage.getItem(STRINGS.STORAGE.token),
					},
				}),
			removeReaction: id =>
				$.ajax({
					url: `${API_URL}/Task/RemoveCommentReaction/${id}`,
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						token: localStorage.getItem(STRINGS.STORAGE.token),
					},
				}),
		},
	},
	COMMENTS: {
		addComment: data =>
			$.ajax({
				url: `${API_URL}/Comment/AddComment`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllComments: data =>
			$.ajax({
				url: `${API_URL}/Comment/GetAllComment`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addReaction: (reference_id, reactionType = 1) =>
			$.ajax({
				url: `${API_URL}/Task/AddCommentReaction`,
				method: "POST",
				data: JSON.stringify({ reference_id, reactionType }),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		removeReaction: id =>
			$.ajax({
				url: `${API_URL}/Task/RemoveCommentReaction/${id}`,
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
	},
	SCHEDULES: {
		create: data =>
			$.ajax({
				url: `${API_URL}/Schedule/AddSchedule`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		update: data =>
			$.ajax({
				url: `${API_URL}/Schedule/UpdateSchedule`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		AddScheduleMembers: userObj =>
			$.ajax({
				url: `${API_URL}/Schedule/AddScheduleMember`,
				method: "POST",
				data: JSON.stringify(userObj),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addExternalUser: obj =>
			$.ajax({
				url: `${API_URL}/Schedule/AddScheduleExternal`,
				type: "POST",
				data: JSON.stringify(obj),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getSchedules: data =>
			$.ajax({
				url: `${API_URL}/Schedule/GetAllSchedule`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllScheduleAssistant: data =>
			$.ajax({
				url: `${API_URL}/Schedule/GetScheduleAssistant`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getSchedule: id =>
			$.ajax({
				url: `${API_URL}/Schedule/GetSchedule/${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		updateScheduleUserStatus: data =>
			$.ajax({
				url: `${API_URL}/Schedule/UpdateScheduleUserStatus`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		verifyScheduleApproval: (id, m) =>
			$.ajax({
				url: `${API_URL}/Schedule/VerifyScheduleApproval?id=${id}&m=${m}`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: STRINGS.SIGN_UP_DEFAULT_TOKEN,
				},
			}),
		addScheduleRemark: data =>
			$.ajax({
				url: `${API_URL}/Schedule/AddScheduleRemark`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: STRINGS.SIGN_UP_DEFAULT_TOKEN,
				},
			}),
		comments: {
			/*addComment: data => $.ajax({
                url: `${API_URL}/Schedule/AddComment`,
                method: 'POST',
                data: JSON.stringify(data),
                headers: {
                    'MainRightBody-Type': 'application/json',
                    'token': localStorage.getItem(STRINGS.STORAGE.token)
                }
            }),*/
			addComment: data =>
				$.ajax({
					url: `${API_URL}/Comment/AddComment`,
					method: "POST",
					data: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json",
						token: localStorage.getItem(STRINGS.STORAGE.token),
					},
				}),
			/*getAllComments: ({id, parentId, page}) => $.ajax({
                url: `${API_URL}/Schedule/GetComments?id=${id}&parent_id=${parentId}&page=${page}`,
                method: 'GET',
                headers: {
                    'MainRightBody-Type': 'application/json',
                    'token': localStorage.getItem(STRINGS.STORAGE.token)
                }
            }),*/
			getAllComments: data =>
				$.ajax({
					url: `${API_URL}/Comment/GetAllComment`,
					method: "POST",
					data: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json",
						token: localStorage.getItem(STRINGS.STORAGE.token),
					},
				}),
			addReaction: (reference_id, reactionType = 1) =>
				$.ajax({
					url: `${API_URL}/Schedule/AddCommentReaction`,
					method: "POST",
					data: JSON.stringify({ reference_id, reactionType }),
					headers: {
						"Content-Type": "application/json",
						token: localStorage.getItem(STRINGS.STORAGE.token),
					},
				}),
			removeReaction: id =>
				$.ajax({
					url: `${API_URL}/Schedule/RemoveCommentReaction/${id}`,
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						token: localStorage.getItem(STRINGS.STORAGE.token),
					},
				}),
		},
	},
	CUSTOM_APPROVALS: {
		getAll: data =>
			$.ajax({
				url: `${API_URL}/CustomApproval/GetAllCustomApproval`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		create: data =>
			$.ajax({
				url: `${API_URL}/CustomApproval/AddCustomApproval`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addCustomApprovalName: data =>
			$.ajax({
				url: `${API_URL}/CustomApproval/AddCustomApprovalCategory`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllCustomApprovalName: () =>
			$.ajax({
				url: `${API_URL}/CustomApproval/GetAllCustomApprovalCategory`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
	},
	EXPENSES: {
		create: data =>
			$.ajax({
				url: `${API_URL}/Expense/AddExpense`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAll: data =>
			$.ajax({
				url: `${API_URL}/Expense/GetAllExpense`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getExpense: id =>
			$.ajax({
				url: `${API_URL}/Expense/GetExpenseBy_id/${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addApprovalRemark: data =>
			$.ajax({
				url: `${API_URL}/Expense/AddApprovalRemarks`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addExecutorRemark: data =>
			$.ajax({
				url: `${API_URL}/Expense/AddApprovalRemarks`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		MyExpenses: data =>
			$.ajax({
				url: `${API_URL}/Expense/MyExpenses`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
	},
	TRAVELS: {
		create: data =>
			$.ajax({
				url: `${API_URL}/Travel/AddTravel`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAll: data =>
			$.ajax({
				url: `${API_URL}/Travel/GetAllTravel`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getTravel: id =>
			$.ajax({
				url: `${API_URL}/Travel/GetTravelBy_id/${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addApprovalRemark: data =>
			$.ajax({
				url: `${API_URL}/Travel/AddApprovalRemarks`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
	},
	DEPARTMENTS: {
		saveMembersInDepartment: data =>
			$.ajax({
				url: `${API_URL}/Department/SaveDepartmentMembers`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAll: id =>
			$.ajax({
				url: `${API_URL}/department/getalldepartment?id=${id}&page=1`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getById: id =>
			$.ajax({
				url: `${API_URL}/department/GetDepartment?id=${id}&page=1`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		create: data =>
			$.ajax({
				url: `${API_URL}/department/adddepartment`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getLevelById: id =>
			$.ajax({
				url: `${API_URL}/level/GetAllLevelGroup?id=${id}`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
	},
	DOCUMENTS: {
		moveDocument: data =>
			$.ajax({
				url: `${API_URL}/Document/MoveDocument`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		deleteReaderCollaborator: data =>
			$.ajax({
				url: `${API_URL}/Document/RemoveDocumentMembers`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addDocumentAttachment: data =>
			$.ajax({
				url: `${API_URL}/Document/AddDocumentAttachment`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		remarkDocumentApprovalInvitation: data =>
			$.ajax({
				url: `${API_URL}/ApprovalInvitation/RemarkDocumentApprovalInvitation`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addDocumentMembers: data =>
			$.ajax({
				url: `${API_URL}/Document/AddDocumentMembers`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addFolder: data =>
			$.ajax({
				url: `${API_URL}/elearning/addcategory/`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addFile: data =>
			$.ajax({
				url: `${API_URL}/document/adddocument`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllContent: data =>
			$.ajax({
				url: `${API_URL}/document/getalldocumentlist`,
				// url: `${API_URL}/eLearning/getcategorywithcontent`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAll: data =>
			$.ajax({
				url: `${API_URL}/document/getalldocument`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getDocumentById: data =>
			$.ajax({
				url: `${API_URL}/document/GetDocument/?id=${data}`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getDocumentApprovalInvitation: data =>
			$.ajax({
				url: `${API_URL}/ApprovalInvitation/VerifyDocumentApprovalInvitation?id=${data}`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
	},
	NOTES: {
		add: data =>
			$.ajax({
				url: `${API_URL}/notes/addnotes`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		update: data =>
			$.ajax({
				url: `${API_URL}/notes/updatenotes`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAll: data =>
			$.ajax({
				url: `${API_URL}/Notes/GetAllNotes`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		saveNote: data =>
			$.ajax({
				url: `${API_URL}/Notes/SaveNotes`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		remove: id =>
			$.ajax({
				url: `${API_URL}/Notes/RemoveNote?id=${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
	},
	OFFICE_TIMINGS: {
		create: data =>
			$.ajax({
				url: `${API_URL}/hr/addhr_officetimegroup`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getOfficeTimeGroups: page =>
			$.ajax({
				url: `${API_URL}/hr/getallhr_officetimegroup`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getOTGroupById: id =>
			$.ajax({
				url: `${API_URL}/hr/gethr_officetimegroup/${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addHROfficeTime: data =>
			$.ajax({
				url: `${API_URL}/hr/addhr_officetime`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		updateHROfficeTime: data =>
			$.ajax({
				url: `${API_URL}/hr/updatehr_officetime`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addHROfficeTimeUsers: data =>
			$.ajax({
				url: `${API_URL}/hr/addhr_officetimeuser`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getGTimeById: id =>
			$.ajax({
				url: `${API_URL}/hr/gethr_officetimegroup/${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
	},
	APPROVALS: {
		getAllApprovals: data =>
			$.ajax({
				url: `${API_URL}/approval/getallapproval`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		get_approver: mod =>
			$.ajax({
				url: `${API_URL}/approval/GetAllApprovalFlow?module=${mod}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllReferenceApproval: data =>
			$.ajax({
				url: `${API_URL}/Approval/GetAllReferenceApproval`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addRemark: data =>
			$.ajax({
				url: `${API_URL}/approval/addapprovalremarks`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),

		AddApprovalFlow: userObj =>
			$.ajax({
				url: `${API_URL}/approval/AddApprovalFlow`,
				method: "POST",
				data: JSON.stringify(userObj),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		AddApproval: userObj =>
			$.ajax({
				url: `${API_URL}/approval/AddApproval`,
				method: "POST",
				data: JSON.stringify(userObj),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
	},
	LEAVES: {
		addLeave: data =>
			$.ajax({
				url: `${API_URL}/leave/addleave`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllLeaves: options =>
			$.ajax({
				url: `${API_URL}/leave/getallleave`,
				type: "POST",
				data: JSON.stringify(options),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addLeaveType: leaveType =>
			$.ajax({
				url: `${API_URL}/Leave/AddLeaveType`,
				type: "POST",
				data: JSON.stringify(leaveType),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllTypes: () =>
			$.ajax({
				url: `${API_URL}/leave/getallleavetype`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
	},
	NOTIFICATION_COUNTER: {
		getApprovalCounter: () =>
			$.ajax({
				url: `${API_URL}/User/GetSalaryAndPayrollApprovalCount`,
				type: "GET",
				// data: JSON.stringify(obj),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
	},
	HR: {
		getApprovalSalary: obj =>
			$.ajax({
				url: `${API_URL}/HR_EmployeeSalary/GetAllSalary`,
				type: "POST",
				data: JSON.stringify(obj),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addPreEmployment: obj =>
			$.ajax({
				url: `${API_URL}/HR_PreEmployement/AddPreEmployement`,
				type: "POST",
				data: JSON.stringify(obj),
				headers: {
					"Content-Type": "application/json",
					// 'token': localStorage.getItem(STRINGS.STORAGE.token)
				},
			}),
		addBankDetail: obj =>
			$.ajax({
				url: `${API_URL}/HREmployee/addhr_employeebankdetail`,
				type: "POST",
				data: JSON.stringify(obj),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addHRDefaultApproval: obj =>
			$.ajax({
				url: `${API_URL}/HR/AddHR_DefaultApproval`,
				type: "POST",
				data: JSON.stringify(obj),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllDefaultApproval: obj =>
			$.ajax({
				url: `${API_URL}/HR/GetAllHR_DefaultApproval`,
				type: "POST",
				data: JSON.stringify(obj),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllBankDetail: user_id =>
			$.ajax({
				url: `${API_URL}/HREmployee/gethr_employeebankdetail?user_id=${user_id}`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		removeDefaultApproval: user_id =>
			$.ajax({
				url: `${API_URL}/HR/RemoveHR_DefaultApproval?id=${user_id}`,
				type: "DELETE",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllPreEmployment: () =>
			$.ajax({
				url: `${API_URL}/HR_PreEmployement/GetAllPreEmployment`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getPreEmployment: id =>
			$.ajax({
				url: `${API_URL}/HR_PreEmployement/GetPreEmployment?id=${id}`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getApplicantByOfferById: id =>
			$.ajax({
				url: `${API_URL}/HRJob/GetApplicatByOffer_id?id=${id}`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					// 'token': localStorage.getItem(STRINGS.STORAGE.token)
				},
			}),
		getEmpAttendanceId: id =>
			$.ajax({
				url: `${API_URL}/HR_EmployeeAttendance/Get_Employee_Attendance?id=${id}`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		updateEmpAttendanceId: data =>
			$.ajax({
				url: `${API_URL}/HR_EmployeeAttendance/Update_Employee_Attendance`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		updateUserRightsGroup: obj =>
			$.ajax({
				url: `${API_URL}/HR/UpdateUserRightsGroup`,
				type: "POST",
				data: JSON.stringify(obj),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllUserRights: id =>
			$.ajax({
				url: `${API_URL}/USER/GetAllUserRights?id=${id}`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllUserRightsGroup: () =>
			$.ajax({
				url: `${API_URL}/HR/GetAllUserRightsGroup`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addModuleRights: obj =>
			$.ajax({
				url: `${API_URL}/HR/AddUserRightsGroup`,
				type: "POST",
				data: JSON.stringify(obj),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		ModulesForRightsGroup: () =>
			$.ajax({
				url: `${API_URL}/HR/ModulesForRightsGroup`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addSkills: obj =>
			$.ajax({
				url: `${API_URL}/HR/AddSkill`,
				type: "POST",
				data: JSON.stringify(obj),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addHRAllowances: obj =>
			$.ajax({
				url: `${API_URL}/hr_allowance/addhr_allowance`,
				type: "POST",
				data: JSON.stringify(obj),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		removeHRAllowances: id =>
			$.ajax({
				url: `${API_URL}/hr_allowance/removehr_allowance?id=${id}`,
				type: "DELETE",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllHRAllowances: () =>
			$.ajax({
				url: `${API_URL}/hr_allowance/getallhr_allowance`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getSkills: () =>
			$.ajax({
				url: `${API_URL}/HR/GetAllSkill`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllHrAppraisal: id =>
			$.ajax({
				url: `${API_URL}/HREmployee/GetAllHR_Appraisal`,
				type: "POST",
				data: JSON.stringify(id),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getBusinessEmailConfig: id =>
			$.ajax({
				url: `${API_URL}/Business/GetAllBusinessEmailConfiguration`,
				type: "POST",
				data: JSON.stringify(id),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addBusinessEmailConfig: data =>
			$.ajax({
				url: `${API_URL}/Business/AddBusinessEmailConfiguration`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getCurrency: () =>
			$.ajax({
				url: `${API_URL}/HR/GetAllCurrency`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addHoliday: data =>
			$.ajax({
				url: `${API_URL}/HR/AddHoliday`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllHoliday: () =>
			$.ajax({
				url: `${API_URL}/HR/GetHolidays`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addAppraisal: data =>
			$.ajax({
				url: `${API_URL}/HR/AddAppraisalQuestion`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		removeAppraisal: id =>
			$.ajax({
				url: `${API_URL}/HR/RemoveAppraisalQuestion?id=${id}`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addHrAppraisal: data =>
			$.ajax({
				url: `${API_URL}/HREmployee/AddHR_Appraisal`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllAppraisal: (obj = 1) =>
			$.ajax({
				url: `${API_URL}/HR/GetAllAppraisalQuestion?isDefault=${obj}`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addDesignation: data =>
			$.ajax({
				url: `${API_URL}/HR/AddDesignation`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllDesignation: () =>
			$.ajax({
				url: `${API_URL}/HR/GetAllDesignation`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addGrade: data =>
			$.ajax({
				url: `${API_URL}/HR/AddGrade`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllGrade: () =>
			$.ajax({
				url: `${API_URL}/HR/GetAllGrade`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		removeGrade: id =>
			$.ajax({
				url: `${API_URL}/HR/RemoveGrade?id=${id}`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addExpenseHeader: data =>
			$.ajax({
				url: `${API_URL}/HR/AddExpenseHeader`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllExpenseHeader: () =>
			$.ajax({
				url: `${API_URL}/HR/GetAllExpenseHeader`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		removeExpenseHeader: id =>
			$.ajax({
				url: `${API_URL}/HR/RemoveExpenseHeader?id=${id}`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addSalaryHeader: data =>
			$.ajax({
				url: `${API_URL}/HR/AddSalaryHeader`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllSalaryHeader: () =>
			$.ajax({
				url: `${API_URL}/HR/GetAllSalaryHeader`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllLoan: data =>
			$.ajax({
				url: `${API_URL}/HREmployeeLoan/GetAllHREmployeeLoan`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addLoan: data =>
			$.ajax({
				url: `${API_URL}/HREmployeeLoan/AddHREmployeeLoan`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllEmployeeSalary: data =>
			$.ajax({
				url: `${API_URL}/HR_EmployeeSalary/GetAllHR_EmployeeSalary`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		removeSalaryHeader: id =>
			$.ajax({
				url: `${API_URL}/HR/RemoveSalaryHeader?id=${id}`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),

		getConfigById: id =>
			$.ajax({
				url: `${API_URL}/Email/GetAllEmailConfiguration?id=${id}`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addConfig: data =>
			$.ajax({
				url: `${API_URL}/Email/AddEmailConfiguration`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		updateConfig: data =>
			$.ajax({
				url: `${API_URL}/Email/UpdateEmailConfiguration`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addEducation: data =>
			$.ajax({
				url: `${API_URL}/HREmployee/AddEmployeeQualification`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addExperience: data =>
			$.ajax({
				url: `${API_URL}/HREmployee/AddEmployeeExperience`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getQualificationById: id =>
			$.ajax({
				url: `${API_URL}/HREmployee/GetAllEmployeeQualification?id=${id}`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getExperienceById: id =>
			$.ajax({
				url: `${API_URL}/HREmployee/GetAllEmployeeExperience?id=${id}`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllEmployeeLink: id =>
			$.ajax({
				url: `${API_URL}/User/GetAllHR_EmployeeLink?id=${id}`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addEmployeeLink: (data, id) =>
			$.ajax({
				url: `${API_URL}/User/AddHR_EmployeeLink?id=${id}`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addHrEmployeeSalary: data =>
			$.ajax({
				url: `${API_URL}/HR_EmployeeSalary/AddHR_EmployeeSalary`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		removeEmployeeLink: (data, id) =>
			$.ajax({
				url: `${API_URL}/User/RemoveHR_EmployeeLink?id=${id}`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addJob: data =>
			$.ajax({
				url: `${API_URL}/HRJob/AddHR_Job`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllJobList: data =>
			$.ajax({
				url: `${API_URL}/HRJob/GetAllHR_Job`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getHrJob: id =>
			$.ajax({
				url: `${API_URL}/HRJob/GetHR_Job?id=${id}`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: STRINGS.SIGN_UP_DEFAULT_TOKEN,
				},
			}),
		addJobApplicant: data =>
			$.ajax({
				url: `${API_URL}/HRJob/AddHR_JobApplicant`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: STRINGS.SIGN_UP_DEFAULT_TOKEN,
				},
			}),
		getAllEmpReportingTo: () =>
			$.ajax({
				url: `${API_URL}/HREmployee/GetAllEmployeeReportingTo`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllHrJobApplication: data =>
			$.ajax({
				url: `${API_URL}/HRJob/GetAllHR_JobApplicant`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getHrJobApplicant: id =>
			$.ajax({
				url: `${API_URL}/HRJob/GetHR_JobApplicant?id=${id}`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		markApplicantStatus: data =>
			$.ajax({
				url: `${API_URL}/HrJob/MarkApplicantStatus`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllInterviews: data =>
			$.ajax({
				url: `${API_URL}/HRJob/GetAllInterviews`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		// markInterviewStatus: data => $.ajax({
		//     url: `${API_URL}/HRJOB/MarkInterviewStatus`,
		//     method: 'POST',
		//     data: JSON.stringify(data),
		//     headers: {
		//         'MainRightBody-Type': 'application/json',
		//         'token': localStorage.getItem(STRINGS.STORAGE.token)
		//     }
		// }),
		markInterviewStatus: data =>
			$.ajax({
				url: `${API_URL}/Schedule/MarkScheduleStatus`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllHrInterviewQuestions: id =>
			$.ajax({
				url: `${API_URL}/HRJOB/GetAllHR_JobApplicantQuestionRating?id=${id}`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		applicantQuestionRating: data =>
			$.ajax({
				url: `${API_URL}/HRJOB/UpdateHR_JobApplicantQuestionRating`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		makeJobOffer: data =>
			$.ajax({
				url: `${API_URL}/HRJOB/SendOfferLetter`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getJobCommentsReference: id =>
			$.ajax({
				url: `${API_URL}/HRJOB/GetHR_JobInterview?id=${id}`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		checkOfferInvitation: id =>
			$.ajax({
				url: `${API_URL}/HRJOB/CheckOfferInvitation?id=${id}`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: STRINGS.SIGN_UP_DEFAULT_TOKEN,
				},
			}),
		markOfferInvite: data =>
			$.ajax({
				url: `${API_URL}/HRJOB/MarkOfferLetterStatus`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: STRINGS.SIGN_UP_DEFAULT_TOKEN,
				},
			}),
		getAllHrJobInterviews: data =>
			$.ajax({
				url: `${API_URL}/HRJOB/GetAllHR_JobInterview`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		updateJobInterviewComment: data =>
			$.ajax({
				url: `${API_URL}/HRJOB/UpdateJobInterviewComment`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),

		// createScheduleForjobApplicant: (data) => $.ajax({
		//     url: `${API_URL}/HRJob/CreateScheduleForjobApplicant`,
		//     type: "POST",
		//     data: JSON.stringify(data),
		//     headers: {
		//         'MainRightBody-Type': 'application/json',
		//         'token': localStorage.getItem(STRINGS.STORAGE.token)
		//     }
		// }),
	},
	ASSETS: {
		add: data =>
			$.ajax({
				url: `${API_URL}/Asset/AddAsset`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllAssets: options =>
			$.ajax({
				url: `${API_URL}/Asset/GetAllAsset`,
				type: "POST",
				data: JSON.stringify(options),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		updateAssetsStatus: options =>
			$.ajax({
				url: `${API_URL}/Asset/UpdateAssetStatus`,
				type: "POST",
				data: JSON.stringify(options),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
	},
	TODO: {
		addSection: data =>
			$.ajax({
				url: `${API_URL}/Todo/AddTodoSection`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllToDoList: options =>
			$.ajax({
				url: `${API_URL}/Todo/GetAllTodoGroup`,
				type: "POST",
				data: JSON.stringify(options),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllToDoGroupList: options =>
			$.ajax({
				url: `${API_URL}/Todo/GetAllTodoGroup`,
				type: "POST",
				data: JSON.stringify(options),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllToDoSection: options =>
			$.ajax({
				url: `${API_URL}/Todo/GetAllTodoSection`,
				type: "POST",
				data: JSON.stringify(options),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllToDoFilter: options =>
			$.ajax({
				url: `${API_URL}/Todo/GetAllTodo`,
				type: "POST",
				data: JSON.stringify(options),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addTodo: data =>
			$.ajax({
				url: `${API_URL}/Todo/AddTodo`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addTodoGroup: data =>
			$.ajax({
				url: `${API_URL}/Todo/AddTodoGroup`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		moveTodo: data =>
			$.ajax({
				url: `${API_URL}/Todo/MoveTodo`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		markTodoStatus: data =>
			$.ajax({
				url: `${API_URL}/Todo/MarkTodoStatus`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getToDo: id =>
			$.ajax({
				url: `${API_URL}/Todo/GetTodo?id=${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		todoSave: ({ data, type }) =>
			$.ajax({
				url: `${API_URL}/Todo/SaveTodo?type=${type}`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		saveTodoGroup: ({ data, type }) =>
			$.ajax({
				url: `${API_URL}/Todo/SaveTodoSection?type=${type}`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
	},
	LEADING_MANAGER: {
		create: data =>
			$.ajax({
				url: `${API_URL}/LeadTask/AddLeadTaskCategory`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllLeadCategory: options =>
			$.ajax({
				url: `${API_URL}/LeadTask/GetAllLeadTaskCategory`,
				type: "POST",
				data: JSON.stringify(options),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		updateGroup: options =>
			$.ajax({
				url: `${API_URL}/LeadTask/UpdateLeadTaskCategory`,
				type: "POST",
				data: JSON.stringify(options),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		updateLeadContactUser: data =>
			$.ajax({
				url: `${API_URL}/LeadTask/UpdateLeadTaskMember`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllManagerList: options =>
			$.ajax({
				url: `${API_URL}/LeadTask/GetAllLeadTaskGroup`,
				type: "POST",
				data: JSON.stringify(options),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllLeadTask: options =>
			$.ajax({
				url: `${API_URL}/LeadTask/GetAllLeadTask`,
				type: "POST",
				data: JSON.stringify(options),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addLeadManagerTask: data =>
			$.ajax({
				url: `${API_URL}/LeadTask/AddLeadTask`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getLeadTask: id =>
			$.ajax({
				url: `${API_URL}/LeadTask/GetLeadTask?id=${id}`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getLeadTaskCategory: id =>
			$.ajax({
				url: `${API_URL}/LeadTask/GetLeadTaskCategory?id=${id}`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllLeadTaskGroupShort: id =>
			$.ajax({
				url: `${API_URL}/LeadTask/GetAllLeadTaskGroupShort?id=${id}`,
				type: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addExternalMember: data =>
			$.ajax({
				url: `${API_URL}/User/AddExternalUser`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		// getExternalUser: id => $.ajax({
		//     url: `${API_URL}/User/GetExternalUser?id=${id}`,
		//     type: "GET",
		//     headers: {
		//         'MainRightBody-Type': 'application/json',
		//         'token': localStorage.getItem(STRINGS.STORAGE.token)
		//     }
		// }),
		getLeadTaskMember: data =>
			$.ajax({
				url: `${API_URL}/LeadTask/GetLeadTaskMember`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addLeadTaskMember: data =>
			$.ajax({
				url: `${API_URL}/LeadTask/AddLeadTaskMembers`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addLeadTaskAssignTo: data =>
			$.ajax({
				url: `${API_URL}/LeadTask/AddLeadTaskAssignTo`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		deleteLeadTaskAssignTo: ({ task_id, user_id }) =>
			$.ajax({
				url: `${API_URL}/LeadTask/RemoveLeadTaskAssignTo?id=${task_id}&user_id=${user_id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		moveTaskCard: data =>
			$.ajax({
				url: `${API_URL}/LeadTask/MoveLeadTask`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		updateLeadTaskLogo: data =>
			$.ajax({
				url: `${API_URL}/LeadTask/UpdateTaskLogo`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		updateLeadTask: data =>
			$.ajax({
				url: `${API_URL}/LeadTask/UpdateLeadTask`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
	},
	COMPANIES: {
		updateBusinessRequestRightsStatus: ({ id, status }) =>
			$.ajax({
				url: `${API_URL}/Business/UpdateBusinessRequestRightsStatus?id=${id}&status=${status}`,
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAll: () =>
			$.ajax({
				url: `${API_URL}/business/getallbusiness`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllGetReqRights: () =>
			$.ajax({
				url: `${API_URL}/Business/GetRequestRights`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllBusinessRightsWithoutId: () =>
			$.ajax({
				url: `${API_URL}/Business/GetAllBusinessRequestRights`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllBusinessAssociation: () =>
			$.ajax({
				url: `${API_URL}/BusinessAssociation/GetAllBusinessAssociation`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addBusiness: data =>
			$.ajax({
				url: `${API_URL}/Business/AddBusiness`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getById: id =>
			$.ajax({
				url: `${API_URL}/Business/GetBusiness?id=${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		enableDisable: data =>
			$.ajax({
				url: `${API_URL}/Business/UpdateDisableStatus`,
				type: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		upDateBusiness: data =>
			$.ajax({
				url: `${API_URL}/Business/UpdateBusiness`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		businessRights: data =>
			$.ajax({
				url: `${API_URL}/Business/BusinessRightsUpdate`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		addBusinessRights: data =>
			$.ajax({
				url: `${API_URL}/Business/AddBusinessRequestRights`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		GetAllFunctionalModules: () =>
			$.ajax({
				url: `${API_URL}/Util/GetAllFunctionalModules`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllBusinessRights: business_id =>
			$.ajax({
				url: `${API_URL}/Business/GetAllBusinssRights?id=${business_id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getOrgChart: data =>
			$.ajax({
				url: `${API_URL}/User/GetOrgChart`,
				method: "POST",
				data: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		sendWelcomeEmail: id =>
			$.ajax({
				url: `${API_URL}/business/SendWelcomeEmail?id=${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getAllBusinessStats: () =>
			$.ajax({
				url: `${API_URL}/Business/GetAllBusinessStats`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
		getBusinessStats: id =>
			$.ajax({
				url: `${API_URL}/Business/GetBusinessStats?id=${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem(STRINGS.STORAGE.token),
				},
			}),
	},
};
