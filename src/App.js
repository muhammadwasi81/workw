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
import Routes from "./routes";
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
							path={ROUTES.ROOT}
							element={
								<Routes
									isLoggedIn={isLoggedIn}
									isMobileView={isMobileScreen}
									activityCount={activityCount}
								/>
							}
						/>
					</ReactRoutes>
				</Router>
			</MainFlexContainer>
		</ErrorBoundary>
	);
};

export default App;

// import "./App.css";
// function App() {
// 	return (
// 		<div className="App">
// 			<h1 className="text-3xl font-bold underline">Hello world!</h1>
// 		</div>
// 	);
// }
// export default App;
