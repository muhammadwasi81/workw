import React, { useState } from "react";

import {
	CheckSquareOutlined,
	PaperClipOutlined,
	PictureOutlined,
	TagOutlined,
} from "@ant-design/icons";

import {
	ContBody,
	TabContainer,
} from "../../../sharedComponents/AppComponents/MainFlexContainer";
import MemberCollapse from "../../../sharedComponents/Collapseable/MemberCollapse";

import TrelloThemeButton from "../UI/TrelloThemeButton";
import WBDCoverImage from "./WBDCoverImage";
import WorkBoardDescription from "./WorkBoardDescription";
import MemberModal from "../Modal/MemberModal";
import LabelModal from "../Modal/LabelModal/LabelModal";
import { useDispatch } from "react-redux";
import { openMembersModal } from "../store/slice";
import { useSelector } from "react-redux";

function WorkBoardDetail() {
	const [members, setMembers] = useState([]);
	// const [label, setLabel] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const dispatch = useDispatch();
	const addMemberCardId = useSelector(
		state => state.trelloSlice.addMemberCardId
	);
	const membersData = useSelector(
		state => state.trelloSlice[addMemberCardId].members
	);
	const cardDueDate = useSelector(
		state => state.trelloSlice[addMemberCardId].cardDueDate
	);
	// console.log("members k data", memberkadata);
	// const member = useSelector(state => state.trelloSlice[addMemberCardId]);
	// const { members: cardMember } = member;
	// console.log("member", member);

	const [isLabelModalVisible, setIsLabelModalVisible] = useState(false);

	const showLabelModal = () => {
		setIsLabelModalVisible(!isLabelModalVisible);
	};
	const showModal = () => {
		setIsModalVisible(!isModalVisible);
	};
	const addMembers = () => {
		// console.log("cardid add member", cardId);
		dispatch(
			openMembersModal({ addMember: true, cardId: addMemberCardId })
		);
	};

	const onSave = members => {
		setIsModalVisible(false);
		setMembers(members);
	};
	return (
		<>
			<div className=" bg-white rounded-xl mt-5">
				<div className="flex flex-col gap-5">
					<WBDCoverImage />
					<div className="flex gap-5 justify-between">
						<div className="basis-9/12">
							<WorkBoardDescription
								dueDate={cardDueDate.dueDate}
								cardId={addMemberCardId}
							/>
						</div>
						<div className="basis-3/12">
							<div className="flex flex-col gap-5">
								<MemberCollapse
									handleAdd={addMembers}
									data={membersData}
									ghost={false}
								/>
								<TrelloThemeButton
									text={"Label"}
									icon={<TagOutlined />}
									onClick={showLabelModal}
								/>
								<TrelloThemeButton
									text={"Check List"}
									icon={<CheckSquareOutlined />}
								/>
								<TrelloThemeButton
									text={"Dates"}
									icon={<TagOutlined />}
								/>
								<TrelloThemeButton
									text={"Attachment"}
									icon={<PaperClipOutlined />}
								/>
								<TrelloThemeButton
									text={"Cover"}
									icon={<PictureOutlined />}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* <MemberModal
				onSave={onSave}
				showModal={showModal}
				isModalVisible={isModalVisible}
			/> */}
			<LabelModal
				showLabelModal={showLabelModal}
				isLabelModalVisible={isLabelModalVisible}
			/>
		</>
	);
}

export default WorkBoardDetail;
