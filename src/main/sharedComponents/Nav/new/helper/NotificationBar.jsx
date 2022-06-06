import React, { useEffect, useState } from "react";
import sunIcon from "../../../../../content/svg/menu/newNavBarIcon/new/sun.svg";
import moonIcon from "../../../../../content/svg/menu/newNavBarIcon/new/moon.svg";
import addUser from "../../../../../content/svg/menu/newNavBarIcon/new/userAccount.svg";
import search from "../../../../../content/svg/menu/newNavBarIcon/new/search.svg";
import notification from "../../../../../content/svg/menu/newNavBarIcon/new/notification.svg";
import rewards from "../../../../../content/svg/menu/newNavBarIcon/new/rewards.svg";
import stickyNotes from "../../../../../content/svg/menu/newNavBarIcon/new/stickyNotes.svg";
import { setNotificationStatus } from "../../../../../store/appReducer/responsiveSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  disable as disableDarkMode,
  enable as enableDarkMode,
} from "darkreader";
import NotificationModal from "./NotificationModal";
const Approvals = () => {
  return "Approvals";
};
const Notifications = () => {
  return (
    <>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
      <p>notification</p>
    </>
  );
};
function NotificationBar() {
  const [isSearch, setIsSearch] = useState(false);
  const [currentNotification, setCurrentNotification] = useState("");
  const renderNotification = {
    ["approval"]: <Approvals />,
    ["notification"]: <Notifications />,
  };
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(
    window.localStorage.getItem("darkMode") === "1"
  );
  const { navBarStatus, notifcationStatus } = useSelector(
    (state) => state.responsiveSlice
  );
  const handleSearch = () => {
    setIsSearch(!isSearch);
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
  const toggleNotification = () => {
    dispatch(setNotificationStatus(false));
    setCurrentNotification("");
  };
  const getCurrentNotification = (current) => {
    if (current === currentNotification) {
      dispatch(setNotificationStatus(false));
      setCurrentNotification("");
    } else {
      dispatch(setNotificationStatus(true));
      setCurrentNotification(current);
    }
  };
  useEffect(() => {
    setIsSearch(false);
  }, [navBarStatus === false]);

  let classes = "notificationBar ";
  classes += isSearch ? "open" : "";

  return (
    <div className={classes}>
      <ul className="list">
        {isSearch && (
          <input
            type="text"
            style={{
              border: "1px solid #3e3e3e",
              padding: "0 5px",
              outline: "none",
            }}
          />
        )}
        <li className="list__item">
          <img
            alt=""
            src={theme ? sunIcon : moonIcon}
            onClick={() => {
              setTheme(!theme);
              modeHandler(!theme);
            }}
          />
        </li>
        <li className="list__item">
          <img src={addUser} alt="" />
        </li>
        <li className="list__item">
          <img src={stickyNotes} alt="" />
        </li>

        <li
          className="list__item"
          onClick={() => {
            getCurrentNotification("notification");
          }}
        >
          <img src={notification} alt="" />
        </li>
        <li
          className="list__item"
          onClick={() => {
            getCurrentNotification("approval");
          }}
        >
          <img src={rewards} alt="" />
        </li>
        <li className="list__item search" onClick={handleSearch}>
          <img src={search} alt="" />
        </li>
      </ul>
      <NotificationModal
        isVisible={notifcationStatus}
        onClose={toggleNotification}
      >
        {renderNotification[currentNotification]}
      </NotificationModal>
    </div>
  );
}

export default NotificationBar;
