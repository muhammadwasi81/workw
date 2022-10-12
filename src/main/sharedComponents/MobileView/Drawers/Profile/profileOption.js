import React, { useState } from "react";
import { logout, STRINGS } from "../../../../../utils/base";
import { NavLink } from "react-router-dom";
import Avatar from "../../../Avatar/avatarOLD";
import { Drawer } from "antd";
import { ProfileDrawerCon, ProfileDrawerItem } from "./profile.style";
import { useSelector } from "react-redux";

export default function MyDrawer() {
	const [drawerStatus, setDrawerStatus] = useState(false);
	const { user } = useSelector(state => state.userSlice);
	const { name, userId, profile_picture } = user;

	return (
		<div>
			<React.Fragment>
				<div
					className="profileBtn"
					onClick={() => setDrawerStatus(true)}
				>
					<Avatar
						src={profile_picture}
						name={name}
						size={28}
						round={true}
						style={{ border: "1px solid #fff" }}
					/>
				</div>
				<Drawer
					placement={"bottom"}
					size={"large"}
					onClose={() => setDrawerStatus(false)}
					visible={drawerStatus}
					maskClosable={true}
					bodyStyle={{ padding: "10px" }}
					closable={false}
					contentWrapperStyle={{ height: "110px" }}
				>
					<ProfileDrawerCon>
						<ProfileDrawerItem>
							<NavLink
								to={`${STRINGS.ROUTES.USER.TIMELINE.DEFAULT}/${userId}`}
								style={{ color: "#000" }}
							>
								Profile
							</NavLink>
						</ProfileDrawerItem>
						<ProfileDrawerItem>
							<NavLink
								to={`${STRINGS.ROUTES.USER.SETTINGS}/${userId}`}
								style={{ color: "#000" }}
							>
								Setting
							</NavLink>
						</ProfileDrawerItem>
						<ProfileDrawerItem
							onClick={logout}
							style={{ color: "#000" }}
						>
							Logout
						</ProfileDrawerItem>
					</ProfileDrawerCon>
				</Drawer>
			</React.Fragment>
		</div>
	);
}
