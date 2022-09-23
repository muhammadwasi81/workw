import React, { useState } from "react";
import { TabbableContainer } from "../../../../layout/GridStyle";
import Header from "../../../../layout/header/index";
import { ContBody } from "../../../../sharedComponents/AppComponents/MainFlexContainer";
import SideDrawer from "../../../../sharedComponents/Drawer/SideDrawer";
import Tab from "../../../../sharedComponents/Tab";
import TopBar from "../../../../sharedComponents/topBar/topBar";
import ApprovalDetail from "./detail";
import Listing from "./listing";

export default function AllApprovals() {
	const [tableView, setTableView] = useState(false);

	return (
		<TabbableContainer>
			<Header
				buttons={
					[
						// {
						// 	buttonText: "Create Travel",
						// 	// onClick: () => setVisible(true),
						// 	render: (
						// 		<SideDrawer
						// 			title={"Hello"}
						// 			buttonText={"Hello"}
						// 			isAccessDrawer={false}
						// 		>
						// 			"Hello"
						// 		</SideDrawer>
						// 	),
						// },
					]
				}
				backButton={false}
			/>
			<TopBar
				onSearch={value => {
					console.log(value);
				}}
				buttons={[
					{
						name: "Filter",
					},
				]}
				segment={{
					onSegment: value => {
						if (value === "Table") {
							setTableView(true);
						} else {
							setTableView(false);
						}
					},
					label1: "List",
					label2: "Table",
				}}
			/>
			<ContBody>
				<div className="flex ApprovalMainView gap-4 w-full">
					<div className="">
						<Listing />
					</div>
					<div className="flex-1">
						<ApprovalDetail />
					</div>
				</div>
			</ContBody>
		</TabbableContainer>
	);
}
