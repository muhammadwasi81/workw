import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
	addListCardMembers,
	changeListCardText,
	deleteListCard,
	handleCardDetail,
	openMembersModal,
} from "../../store/slice";
import CardEditor from "./CardEditor";
import "./card.css";

import EditDropDown from "../MenuDropDown/EditDropDown";
import MemberModal from "../../Modal/MemberModal";
import EditMembers from "../EditMembers/EditMembers";
import CardDetailModal from "../Modal/CardDetailModal";
import { EyeOutlined } from "@ant-design/icons";
import Avatar from "../../../../sharedComponents/Avatar/avatarOLD";

function Card(props) {
	const [editing, setEditing] = useState(false);
	const [text, setText] = useState("");
	const { listId, cardId, index } = props;
	const cardData = useSelector(state => state.trelloSlice[cardId]);
	// const memberCardId = useSelector(
	// 	state => state.trelloSlice.addMemberCardId
	// );
	// const [membersId, setMembersId] = useState([]);
	// const { members, membersId } = cardData;
	// console.log("card data", cardData);
	// console.log("cardId", cardId);
	const dispatch = useDispatch();

	const startEditing = () => {
		setEditing(true);
		setText(props.card.text);
	};

	const endEditing = () => {
		setEditing(false);
	};

	const editCard = async text => {
		endEditing();
		dispatch(changeListCardText({ cardId: cardData._id, cardText: text }));
	};

	const deleteCard = async () => {
		if (window.confirm("Are you sure to delete this card?")) {
			dispatch(deleteListCard({ cardId: cardData._id, listId }));
		}
	};
	const openDetail = () => {
		dispatch(
			handleCardDetail({
				cardDetailId: cardId,
				type: "open",
			})
		);
	};

	// useEffect(() => {
	// 	// console.log("addmembersCardId", addMemberCardId);
	// 	if (memberCardId) {
	// 		if (cardData._id === memberCardId) {
	// 			console.log("cardData.membersId", cardData.membersId);
	// 			// if (!cardData.membersId) {
	// 			// 	return;
	// 			// }
	// 			// setMembersId(cardData.membersId);
	// 			// let newMemberIds;
	// 			// newMemberIds = cardData.membersId;
	// 		}
	// 	}
	// }, [memberCardId]);

	// console.log("members id change", membersId);
	// useEffect(() => {}, [membersId]);

	console.log("members");

	if (!editing) {
		return (
			<>
				<Draggable draggableId={cardData._id} index={index}>
					{(provided, snapshot) => (
						<div
							ref={provided.innerRef}
							{...provided.draggableProps}
							{...provided.dragHandleProps}
							className="Card items-center relative cusrosr-pointer bg-white m-[5px] p-[5px] rounded-sm border shadow-sm text-sm break-words m-h[18px] group"
						>
							<div className="flex mb-3">
								<div onClick={openDetail} className="w-full">
									{cardData.text}
								</div>
								<EditDropDown
									className={"edit-icon"}
									startEditing={startEditing}
									// deleteList={deleteList}
									cardId={cardData._id}
								/>
							</div>
							{cardData.members && cardData.members.length > 0 && (
								<div className="flex items-center justify-between">
									<EyeOutlined />
									{cardData.members.map(mem => (
										<Avatar
											name={mem.name}
											src={mem.image}
											round={true}
											width={"30px"}
											height={"30px"}
											isZoom={true}
										/>
									))}
								</div>
							)}
						</div>
					)}
				</Draggable>
				<EditMembers />
				<CardDetailModal />
			</>
		);
	}

	return (
		<CardEditor
			text={cardData.text}
			onSave={editCard}
			onDelete={deleteCard}
			onCancel={endEditing}
		/>
	);
}

export default Card;
