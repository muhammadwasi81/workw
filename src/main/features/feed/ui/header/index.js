import { Button } from "antd";
import React, { useContext } from "react";
import { STRINGS } from "../../../../../utils/base";
import { dictionaryList } from "../../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";

import LayoutHeader from "../../../../layout/header";
import CheckIn from "../../../attendance/view/CheckIn_Out";
const Header = ({ isCheckedIn = true, width, backButton, routeLink }) => {
	const { userLanguage } = useContext(LanguageChangeContext);
	const label = dictionaryList[userLanguage];
	const items = [
		{
			name: label.appHeader.newsFeed.posts,
			to: `${routeLink ? routeLink : STRINGS.ROUTES.ROOT}`,
			renderButton: [1],
		},
		{
			name: label.appHeader.newsFeed.photos,
			to: `${routeLink ? routeLink : STRINGS.ROUTES.ROOT}?f=photos`,
			renderButton: [1],
		},
		{
			name: label.appHeader.newsFeed.polls,
			to: `${routeLink ? routeLink : STRINGS.ROUTES.ROOT}?f=polls`,
			renderButton: [1],
		},
		{
			name: label.appHeader.newsFeed.videos,
			to: `${routeLink ? routeLink : STRINGS.ROUTES.ROOT}?f=videos`,
			renderButton: [1],
		},
		{
			name: label.appHeader.newsFeed.docs,
			to: `${routeLink ? routeLink : STRINGS.ROUTES.ROOT}?f=docs`,
			renderButton: [1],
		},
		{
			name: label.appHeader.newsFeed.tagged,
			to: `${routeLink ? routeLink : STRINGS.ROUTES.ROOT}?f=tagged`,
			renderButton: [1],
		},
	];
	const buttons = [
		{
			buttonText: "Check In",
			render: <CheckIn />,
		},
	];
	return (
		<LayoutHeader
			items={items}
			buttons={isCheckedIn ? buttons : []}
			width={width}
			backButton={backButton}
		/>
	);
};
export default Header;
