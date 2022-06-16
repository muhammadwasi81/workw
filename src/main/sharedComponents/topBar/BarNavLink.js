import React from "react";
import { NavLink } from "react-router-dom";

const HeaderNavLink = ({
	urlParam,
	to,
	activeName,
	isDefault,
	linkName,
	extraClasses,
	onClick,
}) => {
	// console.log("url param", urlParam);
	// console.log("active name", activeName);
	return (
		<NavLink
			className={`li ${
				urlParam === activeName || isDefault ? "onn " : " "
			} ${extraClasses} !flex !items-center`}
			to={to ? to : "#"}
			onClick={onClick}
		>
			{linkName}
		</NavLink>
	);
};
export default HeaderNavLink;
