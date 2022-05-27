import React from "react";
import { NavLink } from "react-router-dom";

const HeaderNavLink = ({
	urlParam,
	to,
	activeName,
	isDefault,
	linkName,
	filterType,
	onClick,
}) => {
	return (
		<NavLink
			className={`li ${
				urlParam === activeName || isDefault ? "onn " : " "
			} ${filterType ? "topbarOn topBtn" : "topBtn"}
            !flex !items-center
            }`}
			to={to ? to : "#"}
			onClick={onClick}
		>
			{linkName}
		</NavLink>
	);
};
export default HeaderNavLink;
