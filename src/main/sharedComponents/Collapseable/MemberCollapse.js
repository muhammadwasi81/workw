import React from "react";
import { Collapse, List } from "antd";
import { DownOutlined, MailOutlined, PlusOutlined } from "@ant-design/icons";
import Avatar from "../Avatar/avatarOLD";

import "./memberCollapse.css";
const { Panel } = Collapse;

function MemberCollapse({
	handleAdd,
	data = [],
	ghost = true,
	isEmail = false,
	isMember = false,
	onEmailClick = () => {},
}) {
	const onChange = key => {
		// console.log(key);
	};
	// const data = [
	// 	{
	// 		title: "Ant Design Title 1",
	// 	},
	// ];
	return (
		<Collapse
			onChange={onChange}
			expandIcon={({ isActive }) => (
				<DownOutlined
					rotate={isActive ? 0 : 180}
					className="!text-lg !font-bold !text-primary-color"
				/>
			)}
			ghost={ghost}
			expandIconPosition={"end"}
			defaultActiveKey={["1"]}
		>
			<Panel
				showArrow={true}
				header={
					<div>
						<span className="text-base font-bold text-primary-color">
							Members ({data.length})
						</span>
					</div>
				}
				className="custom_member_collapse"
				extra={
					<div className="flex gap-2">
						{isEmail && (
							<div
								onClick={event => {
									event.stopPropagation();
									onEmailClick();
								}}
							>
								<MailOutlined className="p-2 rounded-full bg-primary-color !text-white " />
							</div>
						)}
						{isMember && (
							<PlusOutlined
								onClick={event => {
									event.stopPropagation();
									// handleAdd();
								}}
								className="p-2 rounded-full bg-primary-color !text-white "
							/>
						)}
					</div>
				}
				key="1"
			>
				<List
					itemLayout="horizontal"
					dataSource={data}
					className={"max-h-[300px] overflow-y-auto"}
					renderItem={item => {
						return (
							<List.Item>
								<List.Item.Meta
									avatar={
										<Avatar
											name={item.member?.name}
											src={item.member?.image}
											round={true}
											width={"30px"}
											height={"30px"}
											isZoom={true}
										/>
									}
									title={
										<span className=" text-black font-bold">
											{item?.member?.name}
										</span>
									}
									description={
										<span className="text-gray-500 text-xs ">
											{item.member?.designation
												? item.member?.designation
												: "No designation"}
										</span>
									}
								/>
								{/* <FaUserLock className="text-xl text-primary-color" /> */}
							</List.Item>
						);
					}}
				/>
			</Panel>
		</Collapse>
	);
}

export default MemberCollapse;
