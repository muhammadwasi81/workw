import React from "react";
import ProfileRoutes from "../routes/ProfileRoutes";
import ProfilePanelList from "../UI/ProfilePanelList";

function ProfilePanel() {
	return (
		<div className="flex flex-1 bg-white p-3 rounded-lg overflow-hidden shadow-xl">
			<ProfilePanelList />
			<ProfileRoutes />
		</div>
	);
}

export default ProfilePanel;
