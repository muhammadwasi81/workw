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

const menu = (startEditing, addMembers, deleteList, showDateModal) => {
	return (
		<Menu
			items={[
				{
					key: "1",
					label: (
						<div
							className="flex items-center gap-3"
							onClick={e => {
								startEditing();
							}}
						>
							<EditOutlined className="text-base" />
							<span className="">Edit Title</span>
						</div>
					),
				},
				{
					key: "2",
					label: (
						<div
							className="flex items-center gap-3"
							onClick={e => {
								addMembers();
							}}
						>
							<UserAddOutlined className="text-base" />
							<span className="">Add Members</span>
						</div>
					),
				},
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
						<div className="flex items-center gap-3">
							<DeleteOutlined
								// onClick={deleteList}
								className="text-base"
							/>
							<span className="">Delete</span>
						</div>
					),
				},
			]}
		/>
	);
};

function EditDropDown({ startEditing, deleteList, cardId }) {
	// const isOpen = useSelector(state => state.trelloSlice.addMember);
	// const memberDefaulIds = useSelector(
	// 	state => state.trelloSlice.memberDefaulIds
	// );
	const dispatch = useDispatch();

	// console.log("save card member", cardId);
	// const onSaveMembers = members => {
	// 	dispatch(addListCardMembers({ members, cardId }));
	// };
	const showDateModal = () => {
		dispatch(openDateModal({ isDateModalOpen: true, cardId }));
	};
	const addMembers = () => {
		// console.log("cardid add member", cardId);
		dispatch(openMembersModal({ addMember: true, cardId }));
	};

	return (
		<>
			<Dropdown
				overlay={menu(
					startEditing,
					addMembers,
					deleteList,
					showDateModal
				)}
				trigger={["click"]}
				// visible={visible}
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
