import {
	CalendarOutlined,
	DeleteOutlined,
	EllipsisOutlined,
	UserAddOutlined,
} from "@ant-design/icons";
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
				// {
				// 	key: "2",
				// 	label: (
				// 		<div className="flex items-center gap-3">
				// 			<UserAddOutlined
				// 				// onClick={deleteList}
				// 				className="text-base"
				// 			/>
				// 			<span className="">Add Members</span>
				// 		</div>
				// 	),
				// },
				// {
				// 	key: "2",
				// 	label: (
				// 		<div className="flex items-center gap-3">
				// 			<CalendarOutlined
				// 				// onClick={deleteList}
				// 				className="text-base"
				// 			/>
				// 			<span className="">Add Date</span>
				// 		</div>
				// 	),
				// },
				// {
				// 	key: "2",
				// 	label: (
				// 		<div className="flex items-center gap-3">
				// 			<DeleteOutlined
				// 				onClick={deleteList}
				// 				className="text-base"
				// 			/>
				// 			<span className="">Delete</span>
				// 		</div>
				// 	),
				// },
			]}
			onClick={item => {
				// console.log("item", item);
			}}
		/>
	);
};

function MenuDropDown({ changeBgColor, deleteList, addMembers }) {
	return (
	<>  
	    <Dropdown 
	      overlay={menu(changeBgColor, deleteList)} trigger={['click']}
	    >
		   <EllipsisOutlined className="cursor-pointer p-1 rounded-sm hover:bg-slate-400 hover:bg-opacity-40 h-fit hover:transition-all" />
	    </Dropdown>
	</>
  );
}


export default MenuDropDown;
