import {
	disable as disableDarkMode,
	enable as enableDarkMode,
} from "darkreader";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import {
	BrowserRouter as Router,
	Navigate,
	Route,
	Routes as ReactRoutes,
} from "react-router-dom";
import Auth from "./main/features/auth/view";
import IndivisualSignup from "./main/features/auth/view/signUp/IndivisualSignup";
import OrganizationalSignup from "./main/features/auth/view/signUp/OrganizationalSignup";
import Verified from "./main/features/auth/view/verification/Verified";
import Verifying from "./main/features/auth/view/verification/Verifying";
import { MainFlexContainer } from "./components/SharedComponent/AppComponents/MainFlexContainer";
import KonnectCall from "./main/features/konnect_call";
import PrivateRotutes from "./routes";
import { setMobileScreenStatus } from "./store/appReducer/responsiveSlice";
import "./index.css";
import "./stylesheets/adminstration.css";
import "./stylesheets/app.css";
import "./stylesheets/composer.css";
import "./stylesheets/documents.css";
import "./stylesheets/resignation.css";
import "./stylesheets/shared.css";
// import "./stylesheets/task.css";
import "./stylesheets/travel.css";
import "./stylesheets/postComposer.css";
// import { Routings } from "./utils/routes";
import ErrorBoundary from "./utils/ErrorBoundary";
import { LanguageChangeContext } from "./utils/localization/localContext/LocalContext";
import { ROUTES } from "./utils/routes";
import { routes } from "./routes/routes";
// import Administration from "./components/HrMenu/Administration/AdministationPanel";
import Designation from "./main/features/designation/view";
// import AdminRoutes from "./components/HrMenu/Administration/AdminRoutes/adminroutes";
import Index from "./components/HrMenu/Administration";
import AccessRole from "./main/features/accessRole/view/AccessRole";
import Appraisal from "./main/features/appraisal/view";
import OfficeTiming from "./main/features/officeTimings/view";
import LeaveType from "./main/features/leaveType/view";
import ExpenseHeader from "./main/features/expenseHeader/view";
import SalaryHeader from "./main/features/salaryHeader/view";
import EmailConfiguration from "./main/features/emailConfiguration/view";
import CustomApprovalCategory from "./main/features/customApprovalCategory/view";
import Allowance from "./main/features/allowance/view";
import JobDescription from "./main/features/jobDescription/view";
import RewardCategory from "./main/features/reward/rewardCategory/view";
import WargningCategory from "./main/features/warningCategory/view";
import Grade from "./main/features/grade/view";
// import { Socket } from "./utils/socket";

const App = () => {
	const { userLanguageChange } = useContext(LanguageChangeContext);
	const isMobileAndTab = useMediaQuery({ query: "(max-width: 800px)" });
	const { isMobileScreen } = useSelector(
		({ responsiveSlice }) => responsiveSlice
	);
	const { token } = useSelector(state => state.userSlice);
	const dispatch = useDispatch();
	useEffect(() => {
		let defaultLanguage = window.localStorage.getItem("rcml-lang");
		if (!defaultLanguage) {
			defaultLanguage = window.navigator.language.substring(0, 2);
		}
		userLanguageChange(defaultLanguage);
	}, [userLanguageChange]);

	useEffect(() => {
		themeHandler(window.localStorage.getItem("darkMode") === "1");
	}, []);
	const [activityCount /*setActivityCount*/] = useState(null);

	const themeHandler = status => {
		if (status) {
			enableDarkMode({
				brightness: 100,
				contrast: 90,
				sepia: 10,
			});
		} else {
			disableDarkMode();
		}
	};

	useEffect(() => {
		dispatch(setMobileScreenStatus(isMobileAndTab));
	}, [isMobileAndTab, dispatch]);

	const isLoggedIn = !!token;
	// const isLoggedIn = true;
	// if (isLoggedIn) Socket(); // i will add this line in <Route/> component. from "./routes"; line 26

	return (
		<ErrorBoundary>
			<MainFlexContainer>
				<Router>
					<ReactRoutes>
						{/*****Public Route******/}
						<Route path={ROUTES.AUTH.SIGN_IN} element={<Auth />} />
						<Route
							path={ROUTES.AUTH.INDIVIDUAL_SIGN_IN}
							element={<IndivisualSignup />}
						/>
						<Route
							path={ROUTES.AUTH.SIGN_UP}
							element={<OrganizationalSignup />}
						/>
						<Route
							path={ROUTES.AUTH.VERIFICATION_SUCCESS}
							element={<Verified />}
						/>
						<Route
							path={`${ROUTES.AUTH.VERIFICATION_INPROCESS}/:id?`}
							element={<Verifying />}
						/>
						<Route
							path={ROUTES.CALL.KONNECT_CALL}
							element={<KonnectCall />}
						/>

						{/*****Public Route******/}
						<Route
							path={"/"}
							element={
								<PrivateRotutes
									isLoggedIn={isLoggedIn}
									isMobileView={isMobileScreen}
									activityCount={activityCount}
								/>
							}
						>
							{routes.Private.map((route, idx) => (
								<Route
									key={idx}
									path={`${route.path}`}
									element={<route.component />}
								/>
							))}
							<Route
								path={ROUTES.HR.ADMINISTRATOR.DEFAULT}
								element={<Index />}
							>
								{/* <AdminRoutes /> */}
								{/* {routes.AdminRoutes.map((route, idx) => (
									<Route
										key={idx}
										path={`${route.path}`}
										element={<route.component />}
									/>
								))} */}
								<Route
									path={ROUTES.HR.ADMINISTRATOR.GRADE}
									element={<Grade />}
								/>
								<Route
									path={ROUTES.HR.ADMINISTRATOR.DESIGNATION}
									element={<Designation />}
								/>
								<Route
									path={ROUTES.HR.ADMINISTRATOR.DEFAULT}
									element={<AccessRole />}
								/>
								<Route
									path={ROUTES.HR.ADMINISTRATOR.APPRASIAL}
									element={<Appraisal />}
								/>
								<Route
									path={ROUTES.HR.ADMINISTRATOR.OFFICETIME}
									element={<OfficeTiming />}
								/>

								<Route
									path={ROUTES.HR.ADMINISTRATOR.LEAVE_TYPES}
									element={<LeaveType />}
								/>

								<Route
									path={
										ROUTES.HR.ADMINISTRATOR.EXPENSE_HEADERS
									}
									element={<ExpenseHeader />}
								/>
								<Route
									path={
										ROUTES.HR.ADMINISTRATOR.SALARY_HEADERS
									}
									element={<SalaryHeader />}
								/>
								<Route
									path={ROUTES.HR.ADMINISTRATOR.EMAIL_CONFIG}
									element={<EmailConfiguration />}
								/>

								<Route
									path={
										ROUTES.HR.ADMINISTRATOR
											.CUSTOM_APPROVAL_CATEGORY
									}
									element={<CustomApprovalCategory />}
								/>
								<Route
									path={ROUTES.HR.ADMINISTRATOR.ALLOWANCES}
									element={<Allowance />}
								/>

								<Route
									path={ROUTES.HR.ADMINISTRATOR.JOB_SKILLS}
									element={<JobDescription />}
								/>
								<Route
									path={
										ROUTES.HR.ADMINISTRATOR.REWARD_CATEGORY
									}
									element={<RewardCategory />}
								/>
								<Route
									path={
										ROUTES.HR.ADMINISTRATOR.WARNING_CATEGORY
									}
									element={<WargningCategory />}
								/>
							</Route>
						</Route>
						<Route path="*" element={<Navigate to="/" replace />} />
					</ReactRoutes>
				</Router>
			</MainFlexContainer>
		</ErrorBoundary>
	);
};

export default App;
