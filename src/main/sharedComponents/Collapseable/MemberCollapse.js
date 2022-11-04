import React from "react";
import { Collapse, List } from "antd";
import {
	DownOutlined,
	MailOutlined,
	PlusCircleFilled,
} from "@ant-design/icons";
// import { FaUserLock } from "react-icons/fa";
// import WhiteCard from "../../features/projects/UI/WhiteCard";
import "./memberCollapse.css";
import Avatar from "../Avatar/avatarOLD";
const { Panel } = Collapse;

function MemberCollapse({
	handleAdd,
	data = [],
	ghost = true,
	isEmail = false,
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
							Members
						</span>
					</div>
				}
				className="custom_member_collapse"
				extra={
					isEmail && (
						<div
							onClick={event => {
								event.stopPropagation();
								onEmailClick();
							}}
						>
							<MailOutlined className="p-2 rounded-full bg-primary-color !text-white " />
						</div>
					)
					// <PlusCircleFilled
					// 	onClick={event => {
					// 		event.stopPropagation();
					// 		handleAdd();
					// 	}}
					// 	className="text-xl font-bold !text-primary-color mr-2"
					// />
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
