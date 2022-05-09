import React, { useContext, useEffect, useState } from "react";
import { STRINGS } from "../../../../../utils/base";
import { dictionaryList } from "../../../../../utils/localization/languages";
import { LanguageChangeContext } from "../../../../../utils/localization/localContext/LocalContext";
import {
	HeaderMenuContainer,
	TabContainer,
	ContBody,
} from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import { ContainerHeader } from "../../../../sharedComponents/AppComponents/MainHeader";
import HeaderNavLink from "../../../../sharedComponents/AppComponents/MainHeader/HeaderNavLink";
import SideDrawer from "../../../../sharedComponents/Drawer/SideDrawer";
import "../../styles/Travel.css";
import TravelComposer from "../TravelComposer/TravelComposer";
import { useMediaQuery } from "react-responsive";

function TravelHeader() {
	const { userLanguage } = useContext(LanguageChangeContext);
	const label = dictionaryList[userLanguage];
	const isTablet = useMediaQuery({ maxWidth: 650 });

	// const [urlParam, seturlParam] = useState("");

	// useEffect(() => {
	// 	console.log(window.location.href);
	// }, [window.location.href]);

	return (
		<TabContainer>
			<ContainerHeader>
				<HeaderMenuContainer>
					<HeaderNavLink
						activeName={"travel"}
						to={STRINGS.ROUTES.TRAVEL.DEFAULT}
						isDefault={true}
						linkName={label.appHeader.travel.travels}
					/>
					{/* <HeaderNavLink
						activeName={"approvals"}
						to={STRINGS.ROUTES.TRAVEL.APPROVALS}
						isDefault={false}
						linkName={label.appHeader.travel.forApprovals}
					/>
					<HeaderNavLink
						activeName={"agent"}
						to={STRINGS.ROUTES.TRAVEL.AGENT}
						isDefault={false}
						linkName={label.appHeader.travel.agentProcess}
					/> */}
				</HeaderMenuContainer>
				{!isTablet && (
					<div
						className="right-menu"
						style={{ paddingRight: "10px" }}
					>
						<div className="btn-hld travel_drawer">
							<SideDrawer
								children={<TravelComposer />}
								title="Create Travel Expense"
								buttonText="Create Travel"
								isAccessDrawer={false}
							/>
						</div>
					</div>
				)}
				{/* <span className="ln" /> */}
			</ContainerHeader>
			<ContBody style={{ display: "flex" }}>
				{/* <div className="lf-col" style={{ flex: 2 }}>
					<TravelListing />
					<TravelApprovals />
				</div>
				<div
					className="rt-col"
					style={{ flex: 1, backgroundColor: "white" }}
				>
					<TravelFilterForm />
				</div> */}
				{/* <p>asdfadsfsadfsadfasdfasdfasdfdsafasdfdsafsadf</p> */}
				{/* <div className="right-menu" style={{ paddingRight: "10px" }}>
					<div className="btn-hld travel_drawer">
					</div>
				</div> */}
			</ContBody>
		</TabContainer>
	);
}

export default TravelHeader;
