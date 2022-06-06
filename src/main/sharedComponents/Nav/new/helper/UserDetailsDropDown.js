import React, { useContext } from "react";
import userIcon from "../../../../../content/NewContent/NavBar/UserSettingToggle/userIcon.svg";
import userLogout from "../../../../../content/NewContent/NavBar/UserSettingToggle/userLogout.svg";
import userSettings from "../../../../../content/NewContent/NavBar/UserSettingToggle/userSettings.svg";
import { STRINGS, logout } from "../../../../../utils/base";
import { NavLink } from "react-router-dom";
import { FontSizeOutlined } from "@ant-design/icons";
import { userSettingToggleFun } from "../../../../../store/appReducer/responsiveSlice";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import { dictionaryList } from "../../../../../utils/localization/languages";
import { useDispatch } from "react-redux";
function UserDetailsDropDown({ id, isToggle }) {
  const { userLanguage, userLanguageChange } = useContext(
    LanguageChangeContext
  );
  const {
    sharedLabels: { Profile, Settings, Logout, SelectLanguage, English, Urdu },
  } = dictionaryList[userLanguage];
  const dispatch = useDispatch();
  const handleLanguageChange = (e) => {
    userLanguageChange(e);
    dispatch(userSettingToggleFun(false));
  };
  let classes = "dropDown ";
  classes += !isToggle ? "close" : "open";

  return (
    <div className={classes}>
      <ul className="list">
        <li className="list__item">
          <NavLink to={`${STRINGS.ROUTES.USER.TIMELINE.DEFAULT}/${id}`}>
            <img src={userIcon} alt="userIcon" />
            <p>{Profile}</p>
          </NavLink>
        </li>
        <li className="list__item">
          <NavLink to={`${STRINGS.ROUTES.USER.SETTINGS}/${id}`}>
            <img src={userSettings} alt="userSettings" />
            <p>{Settings}</p>
          </NavLink>
        </li>
        <li className="list__item" onClick={logout}>
          <img src={userLogout} alt="userSettings" />
          <p>{Logout}</p>
        </li>
      </ul>

      <span>{SelectLanguage}</span>
      <ul className="list lang">
        <li
          className="list__item"
          onClick={() => handleLanguageChange("en")}
          style={{
            backgroundColor: userLanguage === "en" && "#e5e5e5",
          }}
        >
          <p>{English}</p>
          <FontSizeOutlined />
        </li>
        <li
          className="list__item"
          onClick={() => handleLanguageChange("urdu")}
          style={{
            backgroundColor: userLanguage === "urdu" && "#e5e5e5",
          }}
        >
          <p>{Urdu}</p>
          <FontSizeOutlined />
        </li>
      </ul>
    </div>
  );
}

export default UserDetailsDropDown;
