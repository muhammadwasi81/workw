import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import MessengerSlice from '../main/features/Messenger/store/messengerSlice';
import sideBarChatSlice from '../components/MainMenu/SideChatbar/store/sideBarChatSlice';
import requisitionSlice from '../main/features/requisition/store/slice';
import authSlice from '../main/features/auth/store/slice';
import gradeSlice from '../main/features/grade/store/slice';
import rebateCategorySlice from '../main/features/rebateCategory/store/slice';
import taxSlabSlice from '../main/features/taxSlabs/store/slice';
import subsidiarySlice from '../main/features/subsidiary/store/slice';
import subsidiaryOfficeSlice from '../main/features/subsidiaryOffice/store/slice';
import employeeSlice from '../main/features/employee/store/slice';
import officeTimingSlice from '../main/features/officeTimings/store/slice';
import emailConfigurationSlice from '../main/features/emailConfiguration/store/slice';
import designationSlice from '../main/features/designation/store/slice';
import appraisalSlice from '../main/features/appraisal/appraisalQuestion/store/slice';
import warningCategorySlice from '../main/features/warning/warningCategory/store/slice';
import complainCategorySlice from '../main/features/complain/complainCategory/store/slice';
import defaultHiringCriteriaSlice from '../main/features/careers/defaultHiringCriteria/store/slice';
import warningSlice from '../main/features/warning/store/slice';
import departmentSlice from '../main/features/departments/store/slice';
import careerSlice from '../main/features/careers/store/slice';
import leaveTypeSlice from '../main/features/leave/leaveType/store/slice';
import expenseHeaderSlice from '../main/features/expenseHeader/store/slice';
import salaryHeaderSlice from '../main/features/salaryHeader/store/slice';
import businessPolicySlice from '../main/features/businessPolicy/store/slice';
import allowanceSlice from '../main/features/allowance/store/slice';
import rewardCategorySlice from '../main/features/reward/rewardCategory/store/slice';
import payrollGroupSlice from '../main/features/payroll/payrollGroup/store/slice';
import bonusSlice from '../main/features/bonus/store/slice';
import rewardSlice from '../main/features/reward/store/slice';
import leaveSlice from '../main/features/leave/store/slice';
import complainSlice from '../main/features/complain/store/slice';
import promotionSlice from '../main/features/promotion/store/slice';
import projectSlice from '../main/features/projects/store/slice';
import jobDescriptionSlice from '../main/features/jobDescription/store/slice';
import customApprovalCategorySlice from '../main/features/customApprovalCategory/store/slice';
import customApprovalSlice from '../main/features/CustomApprovals/store/slice';
import notificationSlice from '../services/slices/notificationSlice.js';
import generalSlice from './appReducer/generalSlice';
import responseStatusSlice from './appReducer/responseStatusSlice';
import responsiveSlice from './appReducer/responsiveSlice';
import sharedQuillSlice from './appReducer/sharedQuillInstance';
import stickyNotesSlice from './appReducer/stickyNotesSlice';
import userSlice from './appReducer/userSlice';
import sharedSlice from '../utils/Shared/store/slice';
import accessRolesSlice from '../main/features/accessRole/store/slice';
import fiscalYearSlice from '../main/features/fiscalYear/store/slice';
import travelSlice from '../main/features/travel/store/slice';
import feedSlice from '../main/features/feed/store/slice';
import NoteSlice from './appReducer/NoteSlice';
import documentSlice from '../main/features/documents/store/slice';
import newStickySlice from './appReducer/newStickySlice';
import trelloSlice from '../main/features/workboard/store/slice';
import expenseSlice from '../main/features/expense/store/slice';
import taskSlice from '../main/features/task/store/taskSlice';
import leadMangerSlice from '../main/features/leadmanager/store/slice';
import groupSlice from '../main/features/groups/store/slice';
import chartOfAccountsSlice from '../main/features/chartOfAccount/store/slice';
import callingSlice from '../main/features/calling/store/slice';
import salarySlice from '../main/features/salary/store/slice';
import loanSlice from '../main/features/loan/store/slice';
import resignationSlice from './appReducer/resignationSlice';
import voucherSlice from '../main/features/voucher/store/slice';
import scheduleSlice from '../main/features/schedule/store/slice';
import attendanceSlice from '../main/features/attendance/store/slice';
import stickySlice from '../main/features/notes/newStickyNotes/store/stickySlice';
import formSlice from '../main/features/forms/store/slice';
import payrollSlice from '../main/features/payroll/store/slice';
import assetsCategorySlice from '../main/features/assetsCategory/store/slice';
import requestItemSlice from '../main/features/RequestListItems/store/slice';
// import thunk from "redux-thunk";

const reducers = combineReducers({
  scheduleSlice,
  authSlice,
  userSlice,
  feedSlice,
  stickyNotesSlice,
  responsiveSlice,
  responseStatusSlice,
  subsidiarySlice,
  sideBarChatSlice,
  MessengerSlice,
  leaveSlice,
  promotionSlice,
  rebateCategorySlice,
  attendanceSlice,
  //   mailSlice,
  jobDescriptionSlice,
  sharedQuillSlice,
  defaultHiringCriteriaSlice,
  complainCategorySlice,
  payrollGroupSlice,
  fiscalYearSlice,
  customApprovalCategorySlice,
  requisitionSlice,
  rewardCategorySlice,
  rewardSlice,
  complainSlice,
  departmentSlice,
  careerSlice,
  projectSlice,
  customApprovalSlice,
  warningSlice,
  expenseSlice,
  //   call: callSlice,
  general: generalSlice,
  // documentsSlice,
  gradeSlice,
  emailConfigurationSlice,
  salaryHeaderSlice,
  taxSlabSlice,
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
  NoteSlice,
  bonusSlice,
  businessPolicySlice,
  loanSlice,
  resignationSlice,
  newStickySlice,
  documentSlice,
  trelloSlice,
  taskSlice,
  chartOfAccountsSlice,
  leadMangerSlice,
  groupSlice,
  subsidiaryOfficeSlice,
  callingSlice,
  voucherSlice,
  salarySlice,
  stickySlice,
  formSlice,
  payrollSlice,
  assetsCategorySlice,
  requestItemSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: ['userSlice'],
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

const CustomMiddleware = (store) => (next) => async (action) => {
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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false,
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
