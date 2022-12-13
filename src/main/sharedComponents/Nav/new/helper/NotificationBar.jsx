import React, { useEffect, useState } from 'react';
import { ROUTES } from "../../../../../utils/routes";
import sunIcon from '../../../../../content/svg/menu/newNavBarIcon/new/dark_mode.svg';
import moonIcon from '../../../../../content/svg/menu/newNavBarIcon/new/light_mode.svg';
import addUser from '../../../../../content/svg/menu/newNavBarIcon/new/add_user.svg';
import search from '../../../../../content/svg/menu/newNavBarIcon/new/search.svg';
import notification from '../../../../../content/svg/menu/newNavBarIcon/new/ring.svg';
import rewards from '../../../../../content/svg/menu/newNavBarIcon/new/check_list.svg';
import stickyNotes from '../../../../../content/svg/menu/newNavBarIcon/new/sticky_notes.svg';
// import Notes from "../../../../features/notes/Notes";
import NewStickyNote from '../../../../features/notes/NewStickyNote';
import { toggleStickyNote } from '../../../../features/notes/newStickyNotes/store/stickySlice';
import {
  setApprovalStatus,
  setNotificationStatus,
} from '../../../../../store/appReducer/responsiveSlice';
import { useSelector, useDispatch } from 'react-redux';
import {
  disable as disableDarkMode,
  enable as enableDarkMode,
} from 'darkreader';
import NotificationModal from './NavComposer';
import Approvals from '../../../../features/approval/view/SideBarApproval/sideBarAppovals';
import Notifications from '../../../../features/notifiation/view/index';
import OpenImage from '../../../../features/notes/OpenImage';
import StickyContainer from '../../../../features/notes/newStickyNotes/view/components/StickyNotes';
import { quickAddOpen } from '../../../../features/quickEmployee/store/slice';
import { darkModeHandler } from '../../../../../utils/Shared/store/slice';
import { useNavigate } from 'react-router-dom';

function NotificationBar() {
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(
    window.localStorage.getItem('darkMode') === '1'
  );
  const { navBarStatus, notifcationStatus, approvalStatus } = useSelector(
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
    window.localStorage.setItem('darkMode', status ? '1' : '0');
  };

  useEffect(() => {
    setIsSearch(false);
  }, [navBarStatus === false]);

  let classes = 'notificationBar ';
  classes += isSearch ? 'open' : '';

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

  return (
    <div className={classes}>
      <div className="notiBarIcon">
        <ul className="list">
          <li className="list__item">
            <img
              alt="theme-icon"
              // src={theme ? sunIcon : moonIcon}
              src={
                theme
                  ? 'https://img.icons8.com/color/2x/summer--v1.png'
                  : 'https://img.icons8.com/parakeet/512/bright-moon.png'
              }
              onClick={() => {
                setTheme(!theme);
                modeHandler(!theme);
                dispatch(darkModeHandler(!theme));
              }}
            />
          </li>
          <li className="list__item">
            <img src={addUser} alt="" onClick={quickEmployeeHandler} />
          </li>
          <li className="list__item">
            <img src={stickyNotes} alt="" onClick={stickyNoteHandler} />
          </li>
          <li className="list__item" onClick={handleNotification}>
            <img src={notification} alt="" />
          </li>
          <li className="list__item" onClick={handleApproval}>
            <img src={rewards} alt="" />
          </li>
        </ul>
        <div className="searchBar">
          <img
            src={search}
            alt=""
            onClick={handleSearch}
            className="cursor-pointer"
          />
          <input type="text" className={!isSearch ? "d-none" : "globalSearchInput" } onKeyUp={(e) => {if(e.keyCode === 13 && !e.shiftKey) navigate("search")}}  />
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
