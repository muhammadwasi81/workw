import React, { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../utils/routes";
import SideNavigation from "../main/sharedComponents/Nav/";
import TopMenuBar from "../main/sharedComponents/MobileView/topMenu";
import BottomNavigationTab from "../main/sharedComponents/MobileView/bottomNavigationTab/";
import { useSelector } from "react-redux";
import { SOCKET_STATE } from "../utils/Shared/enums/socketEnums";
import Spinner from "../main/sharedComponents/spinner/spinner";
import SideChatBar from "../main/features/SideChatbar/index";
import FcmNotification from "../main/features/notifiation/view/FCM/fcmNotification";
import MainNotification from "../main/sharedComponents/Notification/Notification";
import IncomingCall from "../main/features/calling/view/IncomingCall";
import OutgoingCall from "../main/features/calling/view/outgoingCall";

const PrivateRoute = () => {
  const { token } = useSelector((state) => state.userSlice);
  const isLoggedIn = !!token;

  if (isLoggedIn) {
    return <Outlet />;
  } else {
    return (
      <Navigate
        to={{
          pathname: ROUTES.AUTH.SIGN_IN
        }}
      />
    );
  }
};

export default function Routes({ isLoggedIn, isMobileView, activityCount }) {
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
      {isLoggedIn && <SideNavigation />}
      {isLoggedIn && isMobileView ? <TopMenuBar /> : ""}
      <div className="main-app-style">
        <div className="section ov-des" id="section1">
          <Suspense fallback={<Spinner />}>
            <PrivateRoute />
          </Suspense>
        </div>
      </div>

      {isLoggedIn  && <SideChatBar />}
      {isLoggedIn && isMobileView && <BottomNavigationTab />}
      
      {isLoggedIn  && <FcmNotification />}
      {isLoggedIn  && <IncomingCall />}
      {isLoggedIn  && <OutgoingCall />}
      {isLoggedIn  && <MainNotification />}

    </React.Fragment>
  );
}
