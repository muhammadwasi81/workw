import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FontSizeOutlined } from "@ant-design/icons";
import Avatar from "../../../../../components/SharedComponent/Avatar/avatar";
import navDownIcon from "../../../../../content/svg/menu/newNavBarIcon/navDownIcon.svg";
import navUpIcon from "../../../../../content/svg/menu/newNavBarIcon/navUpIcon.svg";
import userIcon from "../../../../../content/NewContent/NavBar/UserSettingToggle/userIcon.svg";
import userLogout from "../../../../../content/NewContent/NavBar/UserSettingToggle/userLogout.svg";
import userSettings from "../../../../../content/NewContent/NavBar/UserSettingToggle/userSettings.svg";
import { STRINGS, logout } from "../../../../../utils/base";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { userSettingToggleFun } from "../../../../../store/appReducer/responsiveSlice";
function UserDetails() {
  const { userLanguage, userLanguageChange } = useContext(
    LanguageChangeContext
  );
  const {
    user: { name, profile_picture, designation, id },
  } = useSelector((state) => state.userSlice);
  const { navBarStatus } = useSelector((state) => state.responsiveSlice);
  const [isToggle, setIsToggle] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsToggle(false);
  }, [navBarStatus === false]);

  const handleLanguageChange = (e) => {
    userLanguageChange(e);
    dispatch(userSettingToggleFun(false));
  };
  let classes = "dropDown ";
  classes += !isToggle ? "close" : "open";
  const handleToggle = () => {
    setIsToggle(!isToggle);
  };
  return (
    <div className="userDetailsWrapper">
      <div className="userDetails">
        <Avatar
          src={profile_picture}
          name={name}
          active={false}
          round={true}
          style={{ border: "1px solid white" }}
          size={38}
        />
        <div className="userDetails__body">
          <p className="name">{name}</p>
          <span className="job-title">{designation || "Not Designated"}</span>
        </div>
        <div className="userDetails__footer" onClick={handleToggle}>
          <img
            src={!isToggle ? navDownIcon : navUpIcon}
            height={15}
            width={15}
            alt="userSettingToggle"
          />
        </div>
      </div>
      <div className={classes}>
        <ul className="list">
          <li className="list__item">
            <NavLink to={`${STRINGS.ROUTES.USER.TIMELINE.DEFAULT}/${id}`}>
              <img src={userIcon} alt="userIcon" />
              <p>Profile</p>
            </NavLink>
          </li>
          <li className="list__item">
            <NavLink to={`${STRINGS.ROUTES.USER.SETTINGS}/${id}`}>
              <img src={userSettings} alt="userSettings" />
              <p>Settings</p>
            </NavLink>
          </li>
          <li className="list__item" onClick={logout}>
            <img src={userLogout} alt="userSettings" />
            <p>Logout</p>
          </li>
        </ul>

        <span>Select Language</span>
        <ul className="list lang">
          <li
            className="list__item"
            onClick={() => handleLanguageChange("en")}
            style={{
              backgroundColor: userLanguage === "en" && "#e5e5e5",
            }}
          >
            <p>English</p>
            <FontSizeOutlined />
          </li>
          <li
            className="list__item"
            onClick={() => handleLanguageChange("urdu")}
            style={{
              backgroundColor: userLanguage === "urdu" && "#e5e5e5",
            }}
          >
            <p>Urdu</p>
            <FontSizeOutlined />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UserDetails;
