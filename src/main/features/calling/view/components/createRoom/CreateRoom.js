import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, message, Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";

import "./styles/createRoom.css";
// import { HomeOutlined, BranchesOutlined } from "@ant-design/icons";
// import MemberModal from "../../../workboard/Modal/MemberModal";
import CustomModal from "../../../../workboard/Modal/CustomModal";
import AddMember from "../Modal/AddMember";
// import { validateEmail } from "../../../../../utils/Shared/helper/validateEmail";
// import { v4 as id } from "uuid";
import MultipleAvatars from "../../../../../sharedComponents/Avatar/MultipleAvatars";
import ExternalMember from "../Modal/ExternalMember";
import { createRoom } from "../../../store/action";
import { CALL_MEDIA_TYPE } from "../../../constant/enum";

export default function CreateRoom() {
	const [isPassword, setIsPassword] = useState(false);
	const [isMeetingSchedule, setIsMeetingSchedule] = useState(false);
	const [addMember, setAddMember] = useState(false);
	const [externalMemberModal, setExternalMemberModal] = useState(false);
	const [selectedMembers, setSelectedMembers] = useState([]);
	const [membersValue, setMembersValue] = useState([]);
	const [externalMembers, setExternalMembers] = useState([]);

	const loading = useSelector(state => state.callingSlice.loading);
	// const success = useSelector(state => state.callingSlice.success);
	// const roomId = useSelector(state => state.callingSlice.roomId);
	// const user = useSelector(state => state.userSlice.user);

	// useEffect(() => {
	// 	if (success && roomId && !loading) {
	// 		const strWindowFeatures =
	// 			"location=yes,height=800,width=800,scrollbars=yes,status=yes";
	// 		window.open(CALL_URL_PREFIX + roomId, "_blank", strWindowFeatures);
	// 	}
	// }, [success, roomId]);

	const handleAddMemberModal = () => {
		setAddMember(!addMember);
	};
	const handleAddExternalMemberModal = () => {
		setExternalMemberModal(!externalMemberModal);
	};

	const handleSelectedMembers = (val, obj) => {
		const tempObj = obj.map(member => {
			return {
				...member,
				admin: false,
			};
		});
		let unique = getUniqueListBy([...selectedMembers, ...tempObj], "id");
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
	const dispatch = useDispatch();
	const onSubmit = () => {
		const fields = form.getFieldsValue(true);
		if (fields.private && selectedMembers.length === 0) {
			return message.error("Please add atleast one member.");
		}
		let externals = externalMembers.map(member => ({
			admin: false,
			external: true,
			exteralEmail: member,
			userId: null,
		}));
		let members = selectedMembers.map(member => ({
			admin: member.admin,
			exteral: false,
			exteralEmail: null,
			userId: member.id,
		}));

		let dataToSend = {
			...fields,
			members: [...members, ...externals],
			mediaType: CALL_MEDIA_TYPE.VIDEO,
			isVideo: true
		};

		dispatch(createRoom(dataToSend));
	};
	const [form] = Form.useForm();
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
							<Form
								layout=""
								form={form}
								initialValues={{
									private: false,
									roomPassword: "",
								}}
							>
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
									<Form.Item label="Private" name="isPrivate">
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
										<Form.Item label="" name="roomPassword">
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
						<Button
							className="btn btn-primary"
							onClick={onSubmit}
							loading={loading}
						>
							{!isMeetingSchedule
								? "Start Now"
								: "Confirm Schedule"}
						</Button>
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
