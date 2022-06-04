import React, { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
// import { routes } from "./routes";
// import { STRINGS } from "../utils/base";
import { ROUTES } from "../utils/routes";
import Nav from "../components/MainMenu/Nav/";
import TopMenuBar from "../components/SharedComponent/MobileView/topMenu";
import SideChatbar from "../components/MainMenu/SideChatbar";
import BottomNavigationTab from "../components/SharedComponent/MobileView/bottomNavigationTab/";
import { useSelector } from "react-redux";
import { Main as KonnectCallView } from "./../main/container/konnect_call/main";
import { InComingCallContainer } from "../main/container/konnect_call/InComingCallContainer";
import { Socket, SOCKET_STATE } from "../utils/socket";
// import { routes } from "../routes/routes";
const PrivateRoute = () => {
  const { token } = useSelector((state) => state.userSlice);

  // const isLoggedIn = useSelector((state) => state.auth.isLogin);
  const isLoggedIn = !!token;

  // const refresh_token = useSelector((state) => state.Auth?.auth?.refresh_token);
  // const isRefreshTokenExpire = TokenHandler.refreshTokenHandler();

  if (isLoggedIn) {
    // if (isRefreshTokenExpire) {
    //     return <Navigate to="/locked" />
    // if (isLoggedIn) Socket();
    return (
      <Outlet />
      // <R>
      // 	{routes.Private.map((route, idx) => (
      // 		<Route
      // 			key={idx}
      // 			path={`${route.path}`}
      // 			element={<route.component />}
      // 		/>
      // 	))}
      // 	<Route
      // 		path="*"
      // 		element={<Navigate to={ROUTES.HOME} replace />}
      // 	/>
      // </R>
    );
  } else {
    // console.log("redirect un private routes");
    return (
      <Navigate
        to={{
          pathname: ROUTES.AUTH.SIGN_IN,
        }}
      />
    );
  }
};

export default function Routes({ isLoggedIn, isMobileView, activityCount }) {
  // console.log("private routes");
  const minimizeCall = useSelector(({ call }) => call.minimizeCall);
  const inComingCall = useSelector(({ call }) => call.inComingCall);
  const socketState = useSelector(
    ({ general }) => general.socketConnectionState
  );
  const socketStateColor =
    socketState === SOCKET_STATE.CONNECTED
      ? "#42b72a"
      : socketState === SOCKET_STATE.DISCONNECTED
      ? "#f03f27"
      : "blue";

  return (
    <React.Fragment>
      {isLoggedIn && (
        <div
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            zIndex: "999",
            background: socketStateColor,
            color: "white",
          }}
        >
          {socketState}
        </div>
      )}
      {isLoggedIn && <Nav activityCount={activityCount} />}
      {isLoggedIn && isMobileView ? <TopMenuBar /> : ""}
      <div className="main-app-style">
        <div className="section ov-des" id="section1">
          <Suspense
            fallback={
              <div
                style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                }}
              >
                <div>Loading</div>
              </div>
            }
          >
            <PrivateRoute />
          </Suspense>
        </div>
      </div>
      <SideChatbar />
      {minimizeCall && <KonnectCallView short={true} />}
      {inComingCall && <InComingCallContainer />}
      {/* <ChatBoxCont /> */}
      {isLoggedIn && isMobileView && <BottomNavigationTab />}
      {/* {isLoggedIn && <Route path={STRINGS.ROUTES.ROOT} element={<Sidebar/>}/>} */}
    </React.Fragment>
  );
}
