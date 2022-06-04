import React from "react";
import navCloseBtn from "../../../../../content/svg/menu/newNavBarIcon/navCloseBtn.svg";
import mobileCloseDrawer from "../../../../../content/svg/topMenu/mobileCloseDrawer.svg";
// import arrowNavBar from "../../../../../content/svg/menu/newNavBarIcon/arrowNavBar.svg";
import arrowNavBar from "../../../../../content/svg/menu/newNavBarIcon/arrowNavBar.svg";
import { navBarOpen } from "../../../../../store/appReducer/responsiveSlice";
import { useDispatch, useSelector } from "react-redux";
function ToggleButton() {
  const dispatch = useDispatch();
  const { navBarStatus } = useSelector((state) => state.responsiveSlice);

  return (
    <div
      className="toggleButton"
      onClick={() => dispatch(navBarOpen(!navBarStatus))}
    >
      <img src={navBarStatus ? navCloseBtn : arrowNavBar} alt="navOpen" />
    </div>
  );
}

export default ToggleButton;
