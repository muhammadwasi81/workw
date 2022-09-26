import React from "react";
import { Avatar, Dropdown, Menu } from "antd";
import { EllipsisOutlined, SmileOutlined } from "@ant-design/icons";
import { HiDotsHorizontal } from "react-icons/hi";
function List({ data }) {
	const menu = (
		<Menu
			items={[
				{
					key: "1",
					label: (
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://www.antgroup.com"
						>
							1st menu item
						</a>
					),
				},
				{
					key: "2",
					label: (
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://www.aliyun.com"
						>
							2nd menu item (disabled)
						</a>
					),
					icon: <SmileOutlined />,
					disabled: true,
				},
				{
					key: "3",
					label: (
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://www.luohanacademy.com"
						>
							3rd menu item (disabled)
						</a>
					),
					disabled: true,
				},
				{
					key: "4",
					danger: true,
					label: "a danger item",
				},
			]}
		/>
	);
	return (
		<div className="py-5">
			<div className="flex items-center justify-between">
				<div className="flex gap-5">
					<Avatar />
					<div className="flex flex-col">
						<p className="text-base !m-0">
							Android Developer at Miletap
						</p>
						<p className="text-xs text-gray-500">
							August 7, 2022 to present
						</p>
					</div>
				</div>
				<div>
					<Dropdown overlay={menu}>
						<div className="!text-2xl !font-bold cursor-pointer hover:bg-[#F4F4F4] rounded-full transition duration-300 p-2">
							<HiDotsHorizontal className="!text-2xl" />
						</div>
					</Dropdown>
				</div>
			</div>
		</div>
	);
}

export default List;
