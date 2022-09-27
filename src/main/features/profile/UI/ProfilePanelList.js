import React from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { ROUTES } from "../../../../utils/routes";

import { listItem } from "../utils/listItem";

function ProfilePanelList() {
	// const location = useLocation();
	const param = useParams();
	// const { pathname } = location;
	// console.log("location", pathname + "/about");
	// console.log("params", param, location);
	return (
		<div className="flex flex-col bg-white basis-[300px] border-r border-r-neutral-300 p-3">
			<p className="px-2 text-black text-[18px] font-semibold">
				Information
			</p>
			{listItem.map(list => {
				return (
					<div className="p-2">
						<NavLink
							to={ROUTES.USER.DEFAULT + param.id + list.to}
							className={({ isActive }) =>
								isActive
									? "!text-primary-color p-2 font-bold text-base flex overflow-hidden rounded-[8px] bg-[#526bb13d] hover:!text-primary-color hover:bg-[#526bb13d] transition-all duration-300"
									: "text-gray-500 p-2 text-base hover:!bg-[#526bb13d] hover:!text-primary-color rounded-[8px] flex transition-all duration-300 font-semibold"
							}
						>
							{list.name}
						</NavLink>
					</div>
				);
			})}
		</div>
	);
}

export default ProfilePanelList;
