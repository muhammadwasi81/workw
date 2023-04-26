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
  useParams,
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
import "./stylesheets/index.css";
import "./stylesheets/voucher.css";
import ErrorBoundary from "./utils/ErrorBoundary";
import { LanguageChangeContext } from "./utils/localization/localContext/LocalContext";
import { ROUTES } from "./utils/routes";
import { routes } from "./routes/routes";
import { InitMessengerSocket } from "./utils/InitSocket";
import SubmitForm from "./main/features/forms/view/forms/SubmitForm/index.js";
import { openNotification } from "./utils/Shared/store/slice";
import Careers from "./main/features/careers/view/Careers";
import PublicJobs from "./main/features/jobs/view/PublicJobs";
import Jobs from "./main/features/jobs/view/Jobs";
import ApplyJob from "./main/features/careers/view/PublicRoute/ApplyJob";
import ApplyRequisition from "./main/features/requisition/view/publicRoutes/ApplyRequisition";
import SetupPassword from "./main/features/auth/view/SetupPassword";
import { servicesUrls } from "./utils/services/baseURLS";
import { InitializeCallingSocket } from "./main/features/calling/services/socket";
import { ExternalProject } from "./main/features/publicRoutes/projects/view/index";
import Scheduler from "./main/features/publicRoutes/Schedule/Scheduler";
import ForgotPassword from "./main/features/auth/view/signIn/ForgotPasword";

const App = () => {
  const { userLanguageChange } = useContext(LanguageChangeContext);
  // const { id } = useParams();
  // console.log(id, "USEPARAMS");
  const isMobileAndTab = useMediaQuery({ query: "(max-width: 800px)" });
  const { isMobileScreen } = useSelector(
    ({ responsiveSlice }) => responsiveSlice
  );
  const userSlice = useSelector((state) => state.userSlice);
  // const userId = useSelector((state) => state.userSlice?.user?.id);

  const dispatch = useDispatch();
  // console.log(userSlice, "USER DATA");
  const isLoggedIn = !!userSlice.token;
  const loggedInUserId = userSlice?.user?.id;
  console.log(loggedInUserId, "loggedInUserId");
  useEffect(() => {
    let defaultLanguage = window.localStorage.getItem("rcml-lang");
    if (!defaultLanguage) {
      defaultLanguage = window.navigator.language.substring(0, 2);
    }
    userLanguageChange(defaultLanguage);
  }, [userLanguageChange]);

  useEffect(() => {
    themeHandler(window.localStorage.getItem("darkMode") === "1");
    isLoggedIn && InitMessengerSocket(dispatch, userSlice, loggedInUserId);
    isLoggedIn &&
      InitializeCallingSocket.getInstance(
        dispatch,
        servicesUrls.callingSocket,
        userSlice,
        loggedInUserId
      );
  }, [isLoggedIn]);
  const [activityCount /*setActivityCount*/] = useState(null);

  const themeHandler = (status) => {
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
              <Route path={ROUTES.AUTH.SIGN_IN} element={<Auth />} />
              <Route
                path={`${ROUTES.CAREER.APPLYJOB}/:id`}
                element={<ApplyJob width="50%" />}
              />
              <Route
                path={`${ROUTES.REQUISITION.APPLYREQUISITION}/:id`}
                element={<ApplyRequisition />}
              />
              <Route
                path={ROUTES.AUTH.INDIVIDUAL_SIGN_IN}
                element={<IndivisualSignup isLoggedIn={isLoggedIn} />}
              />
              <Route
                path={ROUTES.AUTH.SIGN_UP}
                element={<OrganizationalSignup isLoggedIn={isLoggedIn} />}
              />
              <Route
                path={ROUTES.AUTH.FORGOT_PASS}
                element={<ForgotPassword />}
              />
              <Route path={ROUTES.AUTH.VERIFICATION} element={<Verified />} />
              <Route path={"/verification"} element={<Verifying />} />
              <Route
                path={ROUTES.AUTH.SETUP_PASSWORD}
                element={<SetupPassword />}
              />
              <Route
                path={`${ROUTES.FORMS.SUBMIT_FORM}/:id`}
                element={<SubmitForm />}
              />

              <Route
                path={`${ROUTES.EXTERNAL_PROJECT.REGISTER}`}
                element={<ExternalProject />}
              />
              <Route
                path={`${ROUTES.EXTERNAL_PROJECT_SCHEDULER.REGISTER}/:id`}
                element={<Scheduler />}
              />
              <Route path={`${ROUTES.JOBS.PUBLIC}`} element={<PublicJobs />} />
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
                {routes.Private.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={<route.component />}
                  />
                ))}
                <Route path={"*"} element={<Navigate to={ROUTES.HOME} />} />
              </Route>
              <Route
                path={"*"}
                element={<Navigate to={ROUTES.AUTH.SIGN_IN} />}
              />
            </ReactRoutes>
          </Router>
        </MainFlexContainer>
      </ErrorBoundary>
    </>
  );
};

export default App;
