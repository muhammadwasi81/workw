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
import { MainFlexContainer } from "./main/sharedComponents/AppComponents/MainFlexContainer";
import PrivateRotutes from "./routes";
import { setMobileScreenStatus } from "./store/appReducer/responsiveSlice";
import "./index.css";
import "./stylesheets/adminstration.css";
import "./stylesheets/app.css";
import "./stylesheets/composer.css";
import "./stylesheets/documents.css";
import "./stylesheets/resignation.css";
import "./stylesheets/shared.css";
import "./stylesheets/travel.css";
import "./stylesheets/postComposer.css";
import "./stylesheets/voucher.css";
import ErrorBoundary from "./utils/ErrorBoundary";
import { LanguageChangeContext } from "./utils/localization/localContext/LocalContext";
import { ROUTES } from "./utils/routes";
import { routes } from "./routes/routes";
import { InitMessengerSocket } from "./utils/InitSocket";
import MainNotification from "./main/sharedComponents/Notification/Notification";
import SubmitForm from "./main/features/forms/view/forms/SubmitForm/index.js";
import { openNotification } from "./utils/Shared/store/slice";

const App = () => {
	const { userLanguageChange } = useContext(LanguageChangeContext);

	const isMobileAndTab = useMediaQuery({ query: "(max-width: 800px)" });
	const { isMobileScreen } = useSelector(
		({ responsiveSlice }) => responsiveSlice
	);
	const { token } = useSelector(state => state.userSlice);
	const dispatch = useDispatch();
	const isLoggedIn = !!token;
	useEffect(() => {
		let defaultLanguage = window.localStorage.getItem("rcml-lang");
		if (!defaultLanguage) {
			defaultLanguage = window.navigator.language.substring(0, 2);
		}
		userLanguageChange(defaultLanguage);
	}, [userLanguageChange]);

	useEffect(() => {
		themeHandler(window.localStorage.getItem("darkMode") === "1");
		isLoggedIn && InitMessengerSocket(dispatch, token);
		// dispatch(openNotification({ message: "hello", duration: null }));
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

	// const isLoggedIn = true;
	// if (isLoggedIn) Socket(); // i will add this line in <Route/> component. from "./routes"; line 26
	// console.log("app js", isLoggedIn);
	// console.log("Routes", ROUTES.ROOT);
	return (
		<>
			{/* <div className="!overflow-x-scroll">
				<Table />
			</div> */}
			<ErrorBoundary>
				<MainFlexContainer>
					{/* <img src={loader} className="!bg-transparent" /> */}
					{/* <SoundWaves /> */}
					<Router>
						<ReactRoutes>
							{/*****Public Route******/}
							<Route
								path={ROUTES.AUTH.SIGN_IN}
								element={<Auth />}
							/>
							<Route
								path={ROUTES.AUTH.INDIVIDUAL_SIGN_IN}
								element={
									<IndivisualSignup isLoggedIn={isLoggedIn} />
								}
							/>
							<Route
								path={ROUTES.AUTH.SIGN_UP}
								element={
									<OrganizationalSignup
										isLoggedIn={isLoggedIn}
									/>
								}
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
								path={`${ROUTES.FORMS.SUBMIT_FORM}/:id`}
								element={<SubmitForm />}
							/>

							{/*****Public Route******/}
							<Route
								path={ROUTES.ROOT}
								element={
									<PrivateRotutes
										isLoggedIn={isLoggedIn}
										isMobileView={isMobileScreen}
										activityCount={activityCount}
									/>
								}
							>
								{routes.Private.map(route => (
									<Route
										key={route.path}
										path={route.path}
										element={<route.component />}
									/>
								))}
								<Route
									path={"*"}
									element={<Navigate to={ROUTES.HOME} />}
								/>
							</Route>
							<Route
								path={"*"}
								element={<Navigate to={ROUTES.AUTH.SIGN_IN} />}
							/>
						</ReactRoutes>
					</Router>
				</MainFlexContainer>
			</ErrorBoundary>
			<MainNotification />
		</>
	);
};

export default App;
