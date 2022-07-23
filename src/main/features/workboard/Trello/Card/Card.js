import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
	addListCardMembers,
	changeListCardText,
	deleteListCard,
	handleCardDetail,
	openMembersModal,
	openSectionDetail,
} from "../../store/slice";
import CardEditor from "./CardEditor";
import "./card.css";

import EditDropDown from "../MenuDropDown/EditDropDown";
import MemberModal from "../../Modal/MemberModal";
import EditMembers from "../EditMembers/EditMembers";
import CardDetailModal from "../Modal/CardDetailModal";
import { EyeOutlined } from "@ant-design/icons";
import Avatar from "../../../../sharedComponents/Avatar/avatarOLD";
import CheckDate from "../../UI/CheckDate";
import DateModal from "../../Modal/DateModal";
import {
	getWorkBoardTodoById,
	updateWorkBoardTodoTitle,
} from "../../store/action";

function Card(props) {
	const [editing, setEditing] = useState(false);
	const [text, setText] = useState("");
	const { sectionId, id, index, text: todoText, members, todoData } = props;
	// console.log("props", props);
	// const cardData = useSelector(state => state.trelloSlice[cardId]);
	// const cardDetail = useSelector(state => state.trelloSlice[cardId]);
	const [dueDate, setDueDate] = useState("");
	// console.log("bahar card detail", cardDetail, cardData);
	// useEffect(() => {
	// 	if (cardDetail !== undefined) {
	// 		if (dueDate !== cardDetail.cardDueDate.dueDate) {
	// 			setDueDate(cardDetail.cardDueDate.dueDate);
	// 		}
	// 	}
	// }, [cardDetail]);

	const dispatch = useDispatch();

	const startEditing = () => {
		setEditing(true);
		setText(text);
	};

	const endEditing = () => {
		setEditing(false);
	};

	const editCard = async text => {
		endEditing();
		dispatch(updateWorkBoardTodoTitle({ todoId: id, title: text }));
		// dispatch(changeListCardText({ cardId: cardData._id, cardText: text }));
	};

	const deleteCard = async () => {
		if (window.confirm("Are you sure to delete this card?")) {
			// dispatch(deleteListCard({ cardId: cardData._id, listId }));
		}
	};
	const openDetail = () => {
		dispatch(getWorkBoardTodoById(id));
		// dispatch(openSectionDetail({ type: "open" }));
		// handleCardDetail({
		// 	cardDetailId: cardId,
		// 	type: "open",
		// })
	};

	if (!editing) {
		return (
			<>
				<Draggable draggableId={id} index={index}>
					{(provided, snapshot) => (
						<div
							ref={provided.innerRef}
							{...provided.draggableProps}
							{...provided.dragHandleProps}
							className="Card items-center relative cusrosr-pointer bg-white m-[5px] p-[5px] rounded-sm border shadow-sm text-sm break-words m-h[18px] group"
						>
							<div className="flex mb-3">
								<div
									className="w-full flex flex-col"
									onClick={e => {
										openDetail();
									}}
								>
									{todoText}
									<img
										src={todoData && todoData.image}
										alt=""
										className="pt-2"
									/>
								</div>
								<EditDropDown
									className={"edit-icon"}
									startEditing={startEditing}
									// deleteList={deleteList}
									sectionId={sectionId}
									todoId={id}
								/>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-1">
									{todoData &&
										todoData.dueDate &&
										todoData.dueDate.length > 0 && (
											// <div>{todoData.dueDate}</div>
											<CheckDate
												isOutsideRender={true}
												todoData={todoData}
											/>
										)}
								</div>
								{members && members.length > 0 && (
									<div className="flex">
										{members.map(mem => (
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
						</div>
					)}
				</Draggable>
			</>
		);
	}

	return (
		<CardEditor
			text={todoText}
			onSave={editCard}
			onDelete={deleteCard}
			onCancel={endEditing}
		/>
	);
}

export default Card;
