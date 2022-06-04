import React, { useContext, useState } from "react";
import { STRINGS, logout } from "../../../utils/base";
import { useDispatch, useSelector } from "react-redux";
import {
  navBarOpen,
  userSettingToggleFun,
} from "../../../store/appReducer/responsiveSlice";
import systemLogo from "../../../content/systemLogo.png";
import { NavLink } from "react-router-dom";
import "./style/style.css";
import Approvals from "./approvals";
import StickyNotes from "./stickynotes";
import SearchInput from "./searchinput";
import sunIcon from "../../../content/svg/menu/newNavBarIcon/sunLight.svg";
import moonIcon from "../../../content/svg/menu/newNavBarIcon/moon.svg";
import navCloseBtn from "../../../content/svg/menu/newNavBarIcon/navCloseBtn.svg";
import mobileCloseDrawer from "../../../content/svg/topMenu/mobileCloseDrawer.svg";
import navDownIcon from "../../../content/svg/menu/newNavBarIcon/navDownIcon.svg";
import navUpIcon from "../../../content/svg/menu/newNavBarIcon/navUpIcon.svg";
import userSettings from "../../../content/NewContent/NavBar/UserSettingToggle/userSettings.svg";
import userIcon from "../../../content/NewContent/NavBar/UserSettingToggle/userIcon.svg";
import userLogout from "../../../content/NewContent/NavBar/UserSettingToggle/userLogout.svg";
import "./new/style/style.css";
import {
  disable as disableDarkMode,
  enable as enableDarkMode,
} from "darkreader";
import {
  AboutUser,
  DarkModeToggleMenu,
  DarkToggleIcon,
  LogoContainer,
  NavBarStyledContainer,
  NavBtn,
  NavToggleBtn,
  NavToggleUser,
  ToggleLabel,
  UserNavToggle,
} from "./style/navBar.style";
import NavFooter from "./navFooter";
import NavMenuListContainer from "./navMenuListContainer";
import Notifications from "./notifications/notifications";
import { FontSizeOutlined } from "@ant-design/icons";
import { LanguageChangeContext } from "../../../utils/localization/localContext/LocalContext";
import Avatar from "../../sharedComponents/Avatar/avatar";
import BusinessLogo from "./new/helper/BusinessLogo";
import ToggleButton from "./new/helper/ToggleButton";
import UserDetails from "./new/helper/UserDetails";
import NotificationBar from "./new/helper/NotificationBar";

const Index = () => {
  const defaultState = {
    isZoom: false,
    Message: "",
    variant: "",
    isOpen: false,
    activeMenu: "",
    activityCount: null,
    openView: false,
    openAddEmployeeComposer: false,
    path: "",
    isdDarkMode: window.localStorage.getItem("darkMode") === "1",
  };
  const [state, setState] = useState(defaultState);
  const dispatch = useDispatch();
  const { navBarStatus, userSettingToggle, isMobileScreen } = useSelector(
    (state) => state.responsiveSlice
  );
  const {
    user: { businessLogo, userTypeId, name, profile_picture, designation, id },
  } = useSelector((state) => state.userSlice);

  const onSuccess = (data) => {
    // this.setState({isOpen: data.isOpen, Message: data.Message, variant: data.variant});
  };
  const handleAddEmployee = () => {
    setState({ ...state, openAddEmployeeComposer: true });
  };
  const modeHandler = (status) => {
    if (status) {
      enableDarkMode({
        brightness: 100,
        contrast: 90,
        sepia: 10,
      });
    } else {
      disableDarkMode();
    }
    window.localStorage.setItem("darkMode", status ? "1" : "0");
  };
  const { userLanguage, userLanguageChange } = useContext(
    LanguageChangeContext
  );
  const handleLanguageChange = (e) => {
    userLanguageChange(e);
    dispatch(userSettingToggleFun(false));
  };
  return (
    <NavBarStyledContainer
      navbarstatus={navBarStatus}
      isMobileView={isMobileScreen}
    >
      <div id="mainNav" className="nav-main ov-des">
        <LogoContainer navbarstatus={navBarStatus}>
          {navBarStatus && (
            <NavLink to={STRINGS.ROUTES.ROOT} className="logo-img">
              <img src={businessLogo ? businessLogo : systemLogo} alt="#" />
            </NavLink>
          )}

          {navBarStatus ? (
            <div
              className="navBar-toggle-btn"
              onClick={() => dispatch(navBarOpen(!navBarStatus))}
            >
              <img
                src={!isMobileScreen ? navCloseBtn : mobileCloseDrawer}
                alt="navOpen"
              />
            </div>
          ) : (
            <div
              style={{ margin: "17px 15px" }}
              onClick={() => dispatch(navBarOpen(!navBarStatus))}
            >
              <NavToggleBtn />
            </div>
          )}
        </LogoContainer>

        <NavToggleUser navbarstatus={navBarStatus}>
          <div className="toggle-menu">
            <ToggleLabel className="toggle-label">
              <Avatar
                src={profile_picture}
                name={name}
                active={false}
                round={true}
                style={{ border: "1px solid white" }}
                size={38}
              />
              <AboutUser navbarstatus={navBarStatus}>
                <div className="name">{name}</div>
                <div className="job-title">
                  {designation || "Not Designated"}
                </div>
              </AboutUser>
              <NavBtn
                navbarstatus={navBarStatus}
                onClick={() =>
                  dispatch(userSettingToggleFun(!userSettingToggle))
                }
              >
                {userSettingToggle ? (
                  <img
                    src={navUpIcon}
                    height={14}
                    width={14}
                    alt="userSettingToggle"
                  />
                ) : (
                  <img
                    src={navDownIcon}
                    height={14}
                    width={14}
                    alt="userSettingToggle"
                  />
                )}
              </NavBtn>
            </ToggleLabel>

            {/** need separate component  **/}
            {navBarStatus && userSettingToggle && (
              <div className="user-setting-toggle">
                <NavLink
                  className="user-setting-item"
                  to={`${STRINGS.ROUTES.USER.TIMELINE.DEFAULT}/${id}`}
                  style={{ color: "#000" }}
                >
                  <img src={userIcon} alt="userIcon" width={16} height={16} />
                  <div>Profile</div>
                </NavLink>

                <NavLink
                  className="user-setting-item"
                  to={`${STRINGS.ROUTES.USER.SETTINGS}/${id}`}
                  style={{ color: "#000" }}
                >
                  <img
                    src={userSettings}
                    alt="userSettings"
                    width={16}
                    height={16}
                  />
                  <div>Settings</div>
                </NavLink>

                <div className="user-setting-item" onClick={logout}>
                  <img
                    src={userLogout}
                    alt="userSettings"
                    width={16}
                    height={16}
                  />
                  <div>Logout</div>
                </div>
                <div
                  style={{
                    margin: "4px 0",
                    fontWeight: "600",
                  }}
                >
                  Select Language
                </div>
                <div
                  className="user-setting-item"
                  onClick={() => handleLanguageChange("en")}
                >
                  <FontSizeOutlined />
                  <div
                    style={{
                      fontSize: 11,
                      width: "100%",
                      backgroundColor: userLanguage === "en" && "#e5e5e5",
                      borderRadius: "6px",
                    }}
                  >
                    English
                  </div>
                </div>
                <div
                  className="user-setting-item"
                  onClick={() => handleLanguageChange("urdu")}
                >
                  <FontSizeOutlined />
                  <div
                    style={{
                      fontSize: 11,
                      width: "100%",
                      backgroundColor: userLanguage === "urdu" && "#e5e5e5",
                      borderRadius: "6px",
                    }}
                  >
                    Urdu
                  </div>
                </div>
              </div>
            )}
          </div>
        </NavToggleUser>

        {!isMobileScreen && !navBarStatus && (
          <div className="theme-Btn-close">
            <DarkToggleIcon
              size={38}
              className="ModeIcon"
              src={state.isdDarkMode ? sunIcon : moonIcon}
              onClick={() => {
                setState({
                  ...state,
                  isdDarkMode: !state.isdDarkMode,
                });
                modeHandler(!state.isdDarkMode);
              }}
            />
          </div>
        )}

        {!isMobileScreen && (
          <UserNavToggle
            className="nav-toggle new_nav_toggle"
            navbarstatus={navBarStatus}
            userType={userTypeId}
          >
            <Notifications counter={0} />
            <Approvals onSuccess={onSuccess} counter={0} />
            <StickyNotes />
            <SearchInput />

            {userTypeId === STRINGS.TYPES.USERS.ADMIN ? (
              <div className="toggle-menu a">
                <div className="toggle-label">
                  <i className="ic-addSection" onClick={handleAddEmployee} />
                </div>
              </div>
            ) : (
              userTypeId === STRINGS.TYPES.USERS.SUPER_ADMIN && (
                <div className="toggle-menu a">
                  <div className="toggle-label">
                    <i className="ic-addSection" onClick={handleAddEmployee} />
                  </div>
                </div>
              )
            )}

            <div className="toggle-menu a">
              <DarkModeToggleMenu
                userType={userTypeId}
                className="toggle-label"
              >
                <DarkToggleIcon
                  className="ModeIcon"
                  src={state.isdDarkMode ? sunIcon : moonIcon}
                  onClick={() => {
                    setState({
                      ...state,
                      isdDarkMode: !state.isdDarkMode,
                    });
                    modeHandler(!state.isdDarkMode);
                  }}
                />
              </DarkModeToggleMenu>
            </div>
          </UserNavToggle>
        )}

        <NavMenuListContainer navbarstatus={navBarStatus} />
      </div>
      <NavFooter navbarstatus={navBarStatus} />
    </NavBarStyledContainer>
  );
};
const SideNavigation = () => {
  const { navBarStatus } = useSelector((state) => state.responsiveSlice);
  let classes = "sideNavigation ";
  classes += !navBarStatus ? "close" : "open";
  return (
    <div className={classes}>
      <div className="sideNavigation__top">
        <BusinessLogo />
        <ToggleButton />
      </div>
      <div className="sideNavigation__body">
        <UserDetails />
        <NotificationBar />
      </div>
    </div>
  );
};
export default Index;
// export default SideNavigation;
