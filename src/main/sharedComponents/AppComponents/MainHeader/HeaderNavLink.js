import React from "react";
import { NavLink } from "react-router-dom";

const HeaderNavLink = ({ urlParam, to, activeName, isDefault, linkName }) => {
	return (
		<NavLink
			className={`li ${urlParam === activeName || isDefault ? "on" : ""}`}
			to={to ? to : "#"}
		>
			{linkName}
		</NavLink>
	);
};
export default HeaderNavLink;
