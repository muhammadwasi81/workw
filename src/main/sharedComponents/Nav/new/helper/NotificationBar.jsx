import { useEffect, useState } from "react";
import sunIcon from "../../../../../content/svg/menu/newNavBarIcon/new/dark_mode.svg";
import moonIcon from "../../../../../content/svg/menu/newNavBarIcon/new/light_mode.svg";
import addUser from "../../../../../content/svg/menu/newNavBarIcon/new/add_user.svg";
import search from "../../../../../content/svg/menu/newNavBarIcon/new/search.svg";
import notification from "../../../../../content/svg/menu/newNavBarIcon/new/ring.svg";
import rewards from "../../../../../content/svg/menu/newNavBarIcon/new/check_list.svg";
import stickyNotes from "../../../../../content/svg/menu/newNavBarIcon/new/sticky_notes.svg";
// import Notes from "../../../../features/notes/Notes";
// import NewStickyNote from "../../../../features/notes/NewStickyNote";
import { toggleStickyNote } from "../../../../features/notes/newStickyNotes/store/stickySlice";
import {
  setApprovalStatus,
  setNotificationStatus,
} from "../../../../../store/appReducer/responsiveSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  disable as disableDarkMode,
  enable as enableDarkMode,
} from "darkreader";
import NotificationModal from "./NavComposer";
import Approvals from "../../../../features/approval/view/SideBarApproval/sideBarAppovals";
import Notifications from "../../../../features/notifiation/view/index";
import OpenImage from "../../../../features/notes/OpenImage";
import StickyContainer from "../../../../features/notes/newStickyNotes/view/components/StickyNotes";
import { quickAddOpen } from "../../../../features/quickEmployee/store/slice";
import { darkModeHandler } from "../../../../../utils/Shared/store/slice";
import { useNavigate } from "react-router-dom";
import { globalSearch } from "../../../../features/search/store/actions";
// import { SearchFilterEnum } from "../../../../features/search/utils/enums";
// import { handleGlobalSearch } from "../../../../features/search/store/slice";

function NotificationBar() {
  const [isSearch, setIsSearch] = useState(false);
  // const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(
    window.localStorage.getItem("darkMode") === "1"
  );
  const { navBarStatus, notifcationStatus, approvalStatus } = useSelector(
    (state) => state.responsiveSlice
  );
  const { keyword } = useSelector((state) => state.globalSearchSlice);
  // console.log(keyword, "search keyworddd");
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

  useEffect(() => {
    setIsSearch(false);
  }, [navBarStatus === false]);

  let classes = "notificationBar ";
  classes += isSearch ? "open" : "";

  // Sticky Note
  const toggleNote = useSelector((state) => state.stickySlice.open);

  const stickyNoteHandler = () => {
    dispatch(toggleStickyNote());
  };

  const quickEmployeeHandler = () => {
    dispatch(quickAddOpen());
  };
  const handleNotification = (status = true) => {
    dispatch(setNotificationStatus(status));
  };
  const handleApproval = (status = true) => {
    dispatch(setApprovalStatus(status));
  };
  const openImg = useSelector((state) => state.newStickySlice.openImg);

  function onKeyUp(e) {
    e.preventDefault();
    e.stopPropagation();
    // setKeyword(e.target.value);
    if (e.keyCode === 13 && !e.shiftKey) {
      // setIsSearch();
      dispatch(
        globalSearch({
          pageNo: 1,
          pageSize: 20,
          search: keyword,
          filterType: 0,
        })
      );
      // dispatch(handleGlobalSearch());
      navigate(`search?q=${keyword}`);
      // setIsSearch(false);
      // e.target.value = "";
    }
  }

  return (
    <div className={classes}>
      <div className="notiBarIcon">
        <ul className="list">
          <li className="list__item">
            <img
              alt="theme-icon"
              src={theme ? sunIcon : moonIcon}
              onClick={() => {
                setTheme(!theme);
                modeHandler(!theme);
                dispatch(darkModeHandler(!theme));
              }}
            />
          </li>
          <li className="list__item">
            <img
              src={addUser}
              alt="quick-employee"
              onClick={quickEmployeeHandler}
            />
          </li>
          <li className="list__item">
            <img
              src={stickyNotes}
              alt="sticky-notes"
              onClick={stickyNoteHandler}
            />
          </li>
          <li className="list__item" onClick={handleNotification}>
            <img src={notification} alt="notifications-icon" />
          </li>
          <li className="list__item rewards__icon" onClick={handleApproval}>
            <img src={rewards} alt="rewards-icon" />
          </li>
        </ul>
        <div className="searchBar">
          <img
            src={search}
            alt="search-icon"
            onClick={handleSearch}
            className="cursor-pointer"
          />
          <input
            type="text"
            className={!isSearch ? "d-none" : "globalSearchInput"}
            onKeyUp={(e) => onKeyUp(e)}
          />
        </div>
      </div>
      <NotificationModal
        isVisible={notifcationStatus}
        onClose={() => handleNotification(false)}
      >
        <Notifications />
      </NotificationModal>

      <NotificationModal
        isVisible={approvalStatus}
        onClose={() => handleApproval(false)}
      >
        <Approvals />
      </NotificationModal>

      {openImg && <OpenImage />}
      {toggleNote && <StickyContainer />}
    </div>
  );
}
export default NotificationBar;
