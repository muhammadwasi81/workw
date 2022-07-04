import { DeleteOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import React from "react";
import Colors from "../Colors/Colors";

const menu = (changeBgColor, deleteList) => {
	return (
		<Menu
			items={[
				{
					key: "1",
					label: <Colors colorPicker={changeBgColor} />,
				},
				{
					key: "2",
					label: (
						<div className="flex items-center gap-3">
							<span className="">Delete</span>
							<DeleteOutlined
								onClick={deleteList}
								className="text-base"
							/>
						</div>
					),
				},
			]}
			onClick={item => {
				// console.log("item", item);
			}}
		/>
	);
};

function MenuDropDown({ changeBgColor, deleteList }) {
	return (
		<Dropdown overlay={menu(changeBgColor, deleteList)} trigger={["click"]}>
			<EllipsisOutlined className="cursor-pointer p-1 rounded-sm hover:bg-slate-400 hover:bg-opacity-40 h-fit hover:transition-all" />
		</Dropdown>
	);
}

export default MenuDropDown;
