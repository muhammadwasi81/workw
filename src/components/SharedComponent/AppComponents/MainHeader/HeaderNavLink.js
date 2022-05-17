import React from "react";
import { NavLink } from "react-router-dom";

const HeaderNavLink = ({ urlParam, to, activeName, isDefault, linkName }) => {
	// console.log("url param", urlParam);
	// console.log("active name", activeName);
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
