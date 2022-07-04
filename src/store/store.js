import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
// import { PersistGate } from "redux-persist/integration/react";
// import storage from "redux-persist/lib/storage";
// import { createStore } from "redux";
// import documentsSlice from "../components/MainMenu/Documents/Storne/DocumentsSlice";
// import mailSlice from "../components/MainMenu/Mail/Store/MailSlice";
import MessengerSlice from "../main/features/Messenger/store/messengerSlice";
import sideBarChatSlice from "../components/MainMenu/SideChatbar/store/sideBarChatSlice";
import authSlice from "../main/features/auth/store/slice";
import gradeSlice from "../main/features/grade/store/slice";
import employeeSlice from "../main/features/employee/store/slice";
import officeTimingSlice from "../main/features/officeTimings/store/slice";
import emailConfigurationSlice from "../main/features/emailConfiguration/store/slice";
import designationSlice from "../main/features/designation/store/slice";
import appraisalSlice from "../main/features/appraisal/appraisalQuestion/store/slice";
import warningCategorySlice from "../main/features/warning/warningCategory/store/slice";
import warningSlice from "../main/features/warning/store/slice";
import departmentSlice from "../main/features/departments/store/slice";
import leaveTypeSlice from "../main/features/leave/leaveType/store/slice";
import expenseHeaderSlice from "../main/features/expenseHeader/store/slice";
import salaryHeaderSlice from "../main/features/salaryHeader/store/slice";
import allowanceSlice from "../main/features/allowance/store/slice";
import rewardCategorySlice from "../main/features/reward/rewardCategory/store/slice";
import rewardSlice from "../main/features/reward/store/slice";
import leaveSlice from "../main/features/leave/store/slice";
import complainSlice from "../main/features/complain/store/slice";
import jobDescriptionSlice from "../main/features/jobDescription/store/slice";
import customApprovalCategorySlice from "../main/features/customApprovalCategory/store/slice";
import notificationSlice from "../services/slices/notificationSlice.js";
// import callSlice from "./appReducer/callSlice";
import generalSlice from "./appReducer/generalSlice";
import responseStatusSlice from "./appReducer/responseStatusSlice";
import responsiveSlice from "./appReducer/responsiveSlice";
import sharedQuillSlice from "./appReducer/sharedQuillInstance";
import stickyNotesSlice from "./appReducer/stickyNotesSlice";
import userSlice from "./appReducer/userSlice";
import sharedSlice from "../utils/Shared/store/slice";
import accessRolesSlice from "../main/features/accessRole/store/slice";
import travelSlice from "../main/features/travel/store/slice";
import feedSlice from "../main/features/feed/store/slice";
import loanSlice from "../main/features/loan/store/slice";
import NoteSlice from "./appReducer/NoteSlice";
import newStickySlice from "./appReducer/newStickySlice";
import trelloSlice from "../main/features/workboard/store/slice";

// import thunk from "redux-thunk";

const reducers = combineReducers({
	authSlice,
	userSlice,
	feedSlice,
	stickyNotesSlice,
	responsiveSlice,
	responseStatusSlice,
	sideBarChatSlice,
	MessengerSlice,
	leaveSlice,
	//   mailSlice,
	jobDescriptionSlice,
	sharedQuillSlice,
	customApprovalCategorySlice,
	rewardCategorySlice,
	rewardSlice,
	complainSlice,
	departmentSlice,
	warningSlice,
	//   call: callSlice,
	general: generalSlice,
	// documentsSlice,
	gradeSlice,
	emailConfigurationSlice,
	salaryHeaderSlice,
	expenseHeaderSlice,
	appraisalSlice,
	allowanceSlice,
	leaveTypeSlice,
	officeTimingSlice,
	designationSlice,
	notificationSlice,
	warningCategorySlice,
	employeeSlice,
	accessRolesSlice,
	sharedSlice,
	travelSlice,
	loanSlice,
	NoteSlice,
	newStickySlice,
	trelloSlice,
});

const persistConfig = {
	key: "root",
	storage,
	version: 1,
	whitelist: ["userSlice"],
	// blacklist: ["stickyNotesSlice"]
};
const persistedReducer = persistReducer(persistConfig, reducers);

// const persistedReducer = persistReducer(persistConfig, reducers);
// const checkEnv = () => {
// 	return process.env.NODE_ENV === "development";
// };
// const store = () => {
// 	let store = createStore(persistedReducer);
// 	let persistor = persistStore(store);
// 	return { store, persistor };
// };

const CustomMiddleware = store => next => async action => {
	// if (action.type === "TEST_API") {
	// 	let { url, method, server, dispatch } = action.payload;
	// 	if (method === "GET") {
	// 		if (server === "MESSENGER") {
	// 			store.dispatch({
	// 				type:"LOADER",
	// 				payload:""
	// 			})
	// 			await MessengerConfig.get(url)
	// 				.then(res => {
	// 					console.log(store, "API CALL", "My Middleware")
	// 					console.log(dispatch, "API CALL", "My Middleware")
	// 					store.dispatch({
	// 						type:dispatch,
	// 						payload:res
	// 					})
	// 				})
	// 				.catch(err => {
	// 					store.dispatch({
	// 						type:"ERROR",
	// 						payload:"MESSAGE"
	// 					})
	// 				});
	// 		}
	// 	}
	// 	next(action)
	// }
	// else {
	// 	next(action)
	// }
	next(action);
};

const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}),
	// devTools: process.env.NODE_ENV !== "production",
	// middleware: [thunk],
	// middleware: [...getDefaultMiddleware(), logger],
	// serializableCheck: false,
	// middleware: gDM =>
	// 	gDM({ serializableCheck: false }).concat(checkEnv() && logger),
});
export const persistor = persistStore(store);

export default store;
