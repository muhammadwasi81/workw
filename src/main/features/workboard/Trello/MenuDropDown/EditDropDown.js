import React, { useState } from "react";
import {
	CalendarOutlined,
	DeleteOutlined,
	EditOutlined,
	EllipsisOutlined,
	UserAddOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import MemberModal from "../../Modal/MemberModal";
import { useSelector } from "react-redux";
import {
	addListCardMembers,
	openDateModal,
	openMembersModal,
} from "../../store/slice";
import { useDispatch } from "react-redux";
import { removeWorkBoardTodo } from "../../store/action";

const menu = (startEditing, addMembers, deleteTodo, showDateModal) => {
	return (
		<Menu
			items={[
				// {
				// 	key: "2",
				// 	label: (
				// 		<div
				// 			className="flex items-center gap-3"
				// 			onClick={e => {
				// 				addMembers();
				// 			}}
				// 		>
				// 			<UserAddOutlined className="text-base" />
				// 			<span className="">Add Members</span>
				// 		</div>
				// 	),
				// },
				{
					key: "3",
					label: (
						<div
							className="flex items-center gap-3"
							onClick={() => {
								showDateModal();
							}}
						>
							<CalendarOutlined className="text-base" />
							<span className="">Add Date</span>
						</div>
					),
				},
				{
					key: "4",
					label: (
						<div
							className="flex items-center gap-3"
							onClick={() => {
								deleteTodo();
							}}
						>
							<DeleteOutlined className="text-base" />
							<span className="">Delete</span>
						</div>
					),
				},
			]}
		/>
	);
};

function EditDropDown({ startEditing, todoId, sectionId }) {
	const dispatch = useDispatch();

	const showDateModal = () => {
		dispatch(openDateModal({ isDateModalOpen: true, todoId, sectionId }));
	};
	const addMembers = () => {
		dispatch(openMembersModal({ addMember: true, todoId }));
	};

	const deleteTodo = () => {
		dispatch(removeWorkBoardTodo({ id: todoId, sectionId }));
	};

	return (
		<>
			<Dropdown
				overlay={menu(
					startEditing,
					addMembers,
					deleteTodo,
					showDateModal
				)}
				trigger={["click"]}
				className="z-10"
			>
				<div className="Card-Icons absolute  right-[5px] flex flex-row justify-end invisible group-hover:visible ">
					<div className="Card-Icon flex items-center cursor-pointer w-[24px] h-[24px] justify-center rounded-sm m-[1px] hover:bg-neutral-200 opacity-90 ">
						<EditOutlined />
					</div>
				</div>
			</Dropdown>
		</>
	);
}

export default EditDropDown;
{
	/* <EllipsisOutlined className="cursor-pointer p-1 rounded-sm hover:bg-slate-400 hover:bg-opacity-40 h-fit hover:transition-all" /> */
}
