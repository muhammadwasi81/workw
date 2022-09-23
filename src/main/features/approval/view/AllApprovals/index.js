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
	const [approvalDetailData, setApprovalDetailData] = useState({});

	const handleApprovalDetail = item => {
		console.log("item", item);
		setApprovalDetailData(item);
	};

	return (
		<TabbableContainer>
			<Header
				buttons={[
					{
						buttonText: "Create Travel",
						// onClick: () => setVisible(true),
						render: (
							<SideDrawer
								title={"Hello"}
								buttonText={"Hello"}
								isAccessDrawer={false}
							>
								"Hello"
							</SideDrawer>
						),
					},
				]}
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
						<Listing handleApprovalDetail={handleApprovalDetail} />
					</div>
					<div className="flex-1">
						<ApprovalDetail
							approvalDetailData={approvalDetailData}
						/>
					</div>
				</div>
			</ContBody>
		</TabbableContainer>
	);
}
