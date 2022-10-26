import React, { useEffect, useState } from "react";
import "./style.css";
import mobileBarIcon from "../../../content/svg/topMenu/mobileBarIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./Drawers/Profile/profileOption";
import { navBarOpen } from "../../../store/appReducer/responsiveSlice";
import { MainTopMenuHolder } from "./topMenu.style";
import mailSearch from "../Mail/assests/mailSearch.svg";
import SearchInput from "../searchBox/SearchInput";
import { useLocation } from "react-router-dom";

const TopMenuBar = () => {
  const dispatch = useDispatch();
	const location = useLocation();
  const { navBarStatus } = useSelector((state) => state.responsiveSlice);
  const { isMobileScreen } = useSelector((state) => state.responsiveSlice);
  const [isHide, setIsHide] = useState(false);
  const icon = <img src={mailSearch} width={isMobileScreen ? 15 : 18} height={isMobileScreen ? 15 : 18} alt={"mailSearch"} />;

  // useEffect(() => {
	// 	if (location.pathname.includes("/messenger")) {
	// 		setIsHide(true);
	// 	} else setIsHide(false);
	// }, [location]);
  // const sideBarStatus = useSelector((state) => state.sideBarChatSlice.sideBarChatStatus)
  // const [darkMode, setDarkMode] = useState(window.localStorage.getItem('darkMode') === '1')

  // const openSearch = () => {
  //     $('.mobileSearchBar').parent().addClass('on');
  // }

  // const openNotes = () => {
  //     $('.toggle-menu').removeClass('on');
  //     $('.nav').css({'z-index': 0});
  //     if (!open) dispatch(openStickyNotes()); else dispatch(closeStickyNotes());
  // }

  return (
    <div className="maintopMenu" >
      <MainTopMenuHolder>
        <div onClick={() => dispatch(navBarOpen(!navBarStatus))}>
          <img alt="mobileMenuButton" src={mobileBarIcon} style={{ height: "15px", width: "17px" }} />
        </div>
        <div className="mainTopCenter">
          {/* <Input placeholder="Search"
                           style={{
                               border: "none",
                               borderRadius: "6px"
                           }}
                           prefix={suffix}
                    /> */}

          <SearchInput icon={icon} placeholder="Search" style={{ padding: "2px 11px" }} />

          {/* <Notifications/> */}
          {/* <Approvals/>
                    <div onClick={openNotes}>
                        <img alt="openNotes" src={notes} style={{height: "15px", width: "17px"}}/>
                    </div>

                    <div onClick={() => dispatch(sideBarOpen(!sideBarStatus))}>
                        <img alt="toggleSideBar" src={Messenger} style={{height: "18px", width: "18px"}}/>
                    </div>

                    <div>
                        <img alt="addExternalUser" src={mobileAddExIcon} style={{height: "16px", width: "16px"}}/>
                    </div>

                    <div className="" onClick={() => modeHandler(!darkMode)}>
                        <img alt="modeHandler" src={darkMode ? sunIcon : moonIcon}
                             style={{height: "20px", width: "20px"}}/>
                    </div> */}
        </div>
        <div>
          <Profile />
        </div>
      </MainTopMenuHolder>
    </div>
  );
};

export default TopMenuBar;
