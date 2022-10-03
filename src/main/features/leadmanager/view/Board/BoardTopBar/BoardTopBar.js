import React, { useState } from "react";
import TopBar from "../../../../../sharedComponents/topBar/topBar";
import { BsKanban } from "react-icons/bs";
import {
	AppstoreOutlined,
	BarsOutlined,
	MailOutlined,
} from "@ant-design/icons";
import { Button } from "antd";

function BoardTopBar({ handleView, topBar, handleSearch }) {
	return (
		<TopBar
			onSearch={value => {
				handleSearch(value);
			}}
			// component={
			// 	<div className="ml-auto">
			// 		<Button>Email</Button>
			// 	</div>
			// }
			rightButtons={[
				{ name: "Email", icon: <MailOutlined />, onClick: () => {} },
			]}
			buttons={[]}
			// filter={{
			// 	onFilter: () => {},
			// }}
			segment={{
				onSegment: value => {
					handleView(value);
				},
			}}
			options={[
				{
					label: "List",
					value: "List",
					icon: <BarsOutlined />,
				},
				{
					label: "Board",
					value: "Board",
					icon: <BsKanban />,
				},
				{
					label: "Table",
					value: "Table",
					icon: <AppstoreOutlined />,
				},
			]}
		/>
	);
}

export default BoardTopBar;
