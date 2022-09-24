import React, { useEffect, useState } from "react";
import sunIcon from "../../../../../content/svg/menu/newNavBarIcon/new/sun.svg";
import moonIcon from "../../../../../content/svg/menu/newNavBarIcon/new/moon.svg";
import addUser from "../../../../../content/svg/menu/newNavBarIcon/new/userAccount.svg";
import search from "../../../../../content/svg/menu/newNavBarIcon/new/search.svg";
import notification from "../../../../../content/svg/menu/newNavBarIcon/new/notification.svg";
import rewards from "../../../../../content/svg/menu/newNavBarIcon/new/rewards.svg";
import stickyNotes from "../../../../../content/svg/menu/newNavBarIcon/new/stickyNotes.svg";
import Notes from "../../../../features/notes/Notes";
import NewStickyNote from "../../../../features/notes/NewStickyNote";
import { toggleStickyNote } from "../../../../../store/appReducer/newStickySlice";
import { setNotificationStatus } from "../../../../../store/appReducer/responsiveSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  disable as disableDarkMode,
  enable as enableDarkMode,
} from "darkreader";
import NotificationModal from "./NavComposer";
import Approvals from "../../../../features/approval/view/SideBarApproval/sideBarAppovals";
import Notifications from "../../../../features/notifiation/view/index";
import OpenImage from "../../../../features/notes/OpenImage";
import StickyContainer from "../../../../features/notes/newStickyNotes/StickyContainer";
// const Approvals = () => {
//   return "Approvals";
// };

function NotificationBar() {
  const [isSearch, setIsSearch] = useState(false);
  const [currentNotification, setCurrentNotification] = useState("");
  const renderModal = {
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

  // Sticky Note
  const toggleNote = useSelector((state) => state.newStickySlice.open);
``
  const stickyNoteHandler = () => {
    dispatch(toggleStickyNote());
  };

  const incrementStickyNote = useSelector(
    (state) => state.newStickySlice.incrementArray
  );

  const openImg = useSelector((state) => state.newStickySlice.openImg);
  // console.log(incrementStickyNote);

  //console.log(closeAllSticky);
  //const closeStickyNote = useSelector((state) => state.stickyNotesSlice.open);
  const [title, setTitle] = useState("");
  const titleVal = (titleVal) => {
    setTitle(titleVal);
  };

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
          <img src={stickyNotes} alt="" onClick={stickyNoteHandler} />
        </li>
        {/* {toggleNote && <Notes stickyNoteTitle={title} />} */}
        {/* {<StickyContainer/>} */}
        {toggleNote && <StickyContainer />}
        {incrementStickyNote.map((increment) => (
          <NewStickyNote
            key={increment.id}
            id={increment.id}
            title={increment.title}
            titleVal={increment.titleVal}
            textAreaPlaceholder={increment.textArea_placeholder}
            textAreaValue={
              increment.textArea_value === "Take a Note..."
                ? ""
                : increment.textArea_value
            }
            x_axis={increment.x_axis}
            y_axis={increment.y_axis}
            open={increment.open}
            titleBg={increment.bgColor}
            onGetTitleVal={titleVal}
            img={increment.img}
          />
        ))}
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
        {renderModal[currentNotification]}
      </NotificationModal>
      {openImg && <OpenImage />}
    </div>
  );
}

export default NotificationBar;
