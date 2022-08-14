import { DatePicker, Form, Input, Switch } from "antd";
import React, { useState } from "react";
import "./styles/createRoom.css";
import { HomeOutlined, BranchesOutlined } from "@ant-design/icons";
// import MemberModal from "../../../workboard/Modal/MemberModal";
import CustomModal from "../../../workboard/Modal/CustomModal";
import AddMember from "../../Modal/AddMember";
import { validateEmail } from "../../../../../utils/Shared/helper/validateEmail";
import { v4 as id } from "uuid";
import MultipleAvatars from "../../../../sharedComponents/Avatar/MultipleAvatars";
import ExternalMember from "../../Modal/ExternalMember";
export default function CreateRoom() {
	const [isPassword, setIsPassword] = useState(false);
	const [isMeetingSchedule, setIsMeetingSchedule] = useState(false);
	const [addMember, setAddMember] = useState(false);
	const [externalMemberModal, setExternalMemberModal] = useState(false);
	const [selectedMembers, setSelectedMembers] = useState([]);
	const [membersValue, setMembersValue] = useState([]);
	const [externalMembers, setExternalMembers] = useState([]);

	const handleAddMemberModal = () => {
		setAddMember(!addMember);
	};
	const handleAddExternalMemberModal = () => {
		setExternalMemberModal(!externalMemberModal);
	};

	const handleSelectedMembers = (val, obj) => {
		// setMembersValue(val);

		// if (Array.isArray(obj) && obj.length === 0 && val.length > 0) {
		// 	if (validateEmail(val[val.length - 1])) {
		// 		setSelectedMembers([
		// 			...selectedMembers,
		// 			{
		// 				id: id(),
		// 				name: val[val.length - 1],
		// 				designation: "",
		// 				image: "",
		// 				admin: undefined,
		// 			},
		// 		]);
		// 	}
		// } else {
		// 	let tempArray = obj.map(member => {
		// 		return {
		// 			...member,
		// 			admin: false,
		// 		};
		// 	});
		// 	let unique = getUniqueListBy(
		// 		[...tempArray, ...selectedMembers],
		// 		"id"
		// 	);
		// 	unique = unique.sort((a, b) => Number(b.admin) - Number(a.admin));
		// }

		// let tempObj = [...obj];
		// tempObj[0].admin = false;
		const tempObj = obj.map(member => {
			return {
				...member,
				admin: false,
			};
		});
		let unique = getUniqueListBy([...selectedMembers, ...tempObj], "id");
		// const sortedMembers = [...selectedMembers, ...tempObj].sort(
		// 	(a, b) => Number(b.admin) - Number(a.admin)
		// );
		setSelectedMembers([...unique]);
	};

	const handleMemberHost = id => {
		const updatedMember = selectedMembers.map(member => {
			if (member.id === id) {
				return { ...member, admin: !member.admin };
			}
			return member;
		});
		setSelectedMembers(updatedMember);
	};
	const handleDeleteMember = id => {
		let filteredMembers = selectedMembers.filter(
			member => member.id !== id
		);
		setSelectedMembers([...filteredMembers]);
	};
	const handleDeleteExternalMembers = memberEmail => {
		let filteredMembers = externalMembers.filter(
			member => member !== memberEmail
		);
		setExternalMembers([...filteredMembers]);
	};
	const handleExternalMember = email => {
		setExternalMembers([...externalMembers, email]);
	};
	const getUniqueListBy = (arr, key) => {
		return [...new Map(arr.map(item => [item[key], item])).values()];
	};

	return (
		<>
			<div className="createRoom">
				<div className="createRoom__inner">
					<div>
						<h2>Create Room</h2>
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing
							elit. Quasi aperiam delectus esse numquam,
							cupiditate, nobis minus, deleniti iure tempora non
							at. Eum ex sit vel sapiente dolore facere nihil ab!
						</p>

						<div className="createRoom__form">
							<Form layout="">
								{/* <Form.Item label="Room Name" name="Room Name">
									<Input placeholder="Room Name" />
								</Form.Item> */}
								<div className="btnGroup">
									<button
										className="btn btn-secondary"
										onClick={handleAddMemberModal}
									>
										add member
									</button>
									<button
										className="btn btn-secondary"
										onClick={handleAddExternalMemberModal}
									>
										add external members
									</button>
									<Form.Item label="Private" name="private">
										<Switch size="small" />
									</Form.Item>
									{/* <Form.Item
										label="Anyone Can Join"
										name="Anyone Can Join"
									>
										<Switch size="small" />
									</Form.Item> */}
								</div>
								<div className="invitations">
									<div className="hosts">
										<p>Hosts</p>
										{selectedMembers.filter(
											member => member.admin === true
										).length > 0 ? (
											<MultipleAvatars
												data={selectedMembers.filter(
													member =>
														member.admin === true
												)}
											/>
										) : (
											"No hosts at the moment"
										)}
									</div>
									<div className="members">
										<p>Members</p>
										<MultipleAvatars
											data={selectedMembers}
										/>
									</div>
									<div className="external">
										<p>External Invitations</p>
										<MultipleAvatars
											data={externalMembers}
										/>
									</div>
								</div>
								<div className="createRoom__formBottom">
									<Form.Item
										label="Room Password(External)"
										name="Room Password(External)"
									>
										<Switch
											size="small"
											onChange={() =>
												setIsPassword(
													preValue => !preValue
												)
											}
										/>
									</Form.Item>
								</div>
								{isPassword && (
									<div className="createRoom__formBottom__input">
										<Form.Item label="" name="Room Name">
											<Input placeholder="Create a Password" />
										</Form.Item>
									</div>
								)}

								{/* <div className="createRoom__formBottom">
									<Form.Item
										label="Schedule a Meeting"
										name="Schedule a Meeting"
									>
										<Switch
											size="small"
											onChange={() =>
												setIsMeetingSchedule(
													preValue => !preValue
												)
											}
										/>
									</Form.Item>
								</div> */}
								{isMeetingSchedule && (
									<div className="createRoom__formBottom__input">
										<Form.Item label="" name="meeting">
											<DatePicker />
										</Form.Item>
									</div>
								)}
							</Form>
						</div>
					</div>
					<div className="btnGroupBottom">
						<button className="btn btn-primary">
							{!isMeetingSchedule
								? "Start Now"
								: "Confirm Schedule"}
						</button>
						{/* <button className="btn btn-secondary">
							<HomeOutlined />
							Main Lobby
						</button>
						<button className="btn btn-secondary">
							<BranchesOutlined />
							Depertment Lobby
						</button> */}
					</div>
				</div>
			</div>
			<CustomModal
				title={"Workwise Members"}
				footer={null}
				isModalVisible={addMember}
				centered={true}
				onCancel={handleAddMemberModal}
				destroyOnClose={false}
				children={
					<AddMember
						onChange={handleSelectedMembers}
						handleAddMemberModal={handleAddMemberModal}
						selectedMembers={selectedMembers}
						membersValue={membersValue}
						handleMemberHost={handleMemberHost}
						handleDeleteMember={handleDeleteMember}
					/>
				}
			/>
			<CustomModal
				title={"External Members"}
				footer={null}
				isModalVisible={externalMemberModal}
				centered={true}
				onCancel={handleAddExternalMemberModal}
				destroyOnClose={true}
				children={
					<ExternalMember
						handleExternalMember={handleExternalMember}
						externalMembers={externalMembers}
						deleteExternalMembers={handleDeleteExternalMembers}
					/>
				}
			/>
		</>
	);
}
