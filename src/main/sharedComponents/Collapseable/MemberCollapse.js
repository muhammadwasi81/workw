import React from "react";
import { Collapse, Avatar, List } from "antd";
import { DownOutlined, PlusCircleFilled } from "@ant-design/icons";
import { FaUserLock } from "react-icons/fa";
import WhiteCard from "../../features/projects/UI/WhiteCard";
import "./memberCollapse.css";
const { Panel } = Collapse;

function MemberCollapse(props) {
	const onChange = key => {
		console.log(key);
	};
	const data = [
		{
			title: "Ant Design Title 1",
		},
		{
			title: "Ant Design Title 2",
		},
		{
			title: "Ant Design Title 3",
		},
		{
			title: "Ant Design Title 3",
		},
		{
			title: "Ant Design Title 1",
		},
		{
			title: "Ant Design Title 2",
		},
		{
			title: "Ant Design Title 3",
		},
		{
			title: "Ant Design Title 3",
		},
	];
	return (
		<WhiteCard>
			<Collapse
				onChange={onChange}
				expandIcon={({ isActive }) => (
					<DownOutlined
						rotate={isActive ? 0 : 180}
						className="!text-lg !font-bold !text-primary-color"
					/>
				)}
				ghost={true}
				expandIconPosition={"right"}
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
						<PlusCircleFilled
							onClick={event => {
								event.stopPropagation();
							}}
							className="text-xl font-bold !text-primary-color mr-2"
						/>
					}
					key="1"
				>
					<List
						itemLayout="horizontal"
						dataSource={data}
						className={"max-h-[300px] overflow-y-auto"}
						renderItem={item => (
							<List.Item>
								<List.Item.Meta
									avatar={
										<Avatar src="https://joeschmoe.io/api/v1/random" />
									}
									title={
										<span className="text-base text-black font-bold">
											Syed Danish Ali
										</span>
									}
									description={
										<span className="text-gray-500 text-sm font-medium">
											Reactjs Developer
										</span>
									}
								/>
								<FaUserLock className="text-xl text-primary-color" />
							</List.Item>
						)}
					/>
				</Panel>
			</Collapse>
		</WhiteCard>
	);
}

export default MemberCollapse;
