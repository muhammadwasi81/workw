import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { STRINGS } from "../../../../../utils/base";
import systemLogo from "../../../../../content/systemLogo.png";

function BusinessLogo() {
  const {
    user: { businessLogo },
  } = useSelector((state) => state.userSlice);
  return (
    <div className="businessLogo">
      <NavLink to={STRINGS.ROUTES.ROOT}>
        <img src={businessLogo ? businessLogo : systemLogo} alt="#" />
      </NavLink>
    </div>
  );
}

export default BusinessLogo;
