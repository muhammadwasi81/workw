import React from "react";
import navCloseBtn from "../../../../../content/svg/menu/newNavBarIcon/navCloseBtn.svg";
import mobileCloseDrawer from "../../../../../content/svg/topMenu/mobileCloseDrawer.svg";
import arrowNavBar from "../../../../../content/svg/menu/newNavBarIcon/arrowNavBar.svg";
import { navBarOpen } from "../../../../../store/appReducer/responsiveSlice";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
function ToggleButton() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(max-width: 800px)",
  });
  const dispatch = useDispatch();
  const { navBarStatus } = useSelector((state) => state.responsiveSlice);

  return (
    <div
      className="toggleButton"
      onClick={() => dispatch(navBarOpen(!navBarStatus))}
    >
      {isDesktopOrLaptop ? (
        <img src={mobileCloseDrawer} alt="navOpen" />
      ) : (
        <img src={navBarStatus ? navCloseBtn : arrowNavBar} alt="navOpen" />
      )}
    </div>
  );
}

export default ToggleButton;
